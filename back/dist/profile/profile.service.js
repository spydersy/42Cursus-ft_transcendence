"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const tfa_service_1 = require("../tfa/tfa.service");
let ProfileService = class ProfileService {
    constructor(userService, prisma, tfaService) {
        this.userService = userService;
        this.prisma = prisma;
        this.tfaService = tfaService;
    }
    async me(req, query, res) {
        let ForbiddenString = "";
        let TestUserNameDTO = {
            newname: ForbiddenString,
        };
        console.log("__TEST__USER_NNAME__DTO__ : ", TestUserNameDTO);
        let profile = await this.userService.GetUserByLogin(req.user.username);
        console.log("WEWE11 : ", req.user.username, req.user.username);
        profile['nbFriends'] = await this.userService.GetnbFriends(req.user.username, req.user.username);
        console.log("__USER__PROFILE__ : ", profile);
        return res.send(profile);
    }
    async UploadAvatar(uploadedAvatart, userId, res) {
        let uploaded = await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                defaultAvatar: uploadedAvatart,
            }
        });
        console.log("__UPLOAD__uploaded__ : ", uploaded);
        return res.status(common_1.HttpStatus.CREATED).send(uploadedAvatart);
    }
    async UpdateUserName(newName, userId, res) {
        console.log("__NEW__NAME__ : ", newName);
        try {
            await this.prisma.users.update({
                where: { id: userId },
                data: { displayName: newName },
            });
            return res.status(common_1.HttpStatus.CREATED).send({ "new name": newName });
        }
        catch (_a) {
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": 'Username Already Taken' });
        }
    }
    async GetRequests(UserId, res) {
        let FriendRequests = await this.prisma.friends.findMany({
            where: {
                receiverId: UserId,
                status: client_1.RELATION.PENDING,
            },
            include: {
                sender: true,
            }
        });
        let FriendRequestsDTO = [];
        FriendRequests.forEach(element => {
            FriendRequestsDTO.push(element.sender);
        });
        console.log("__FRIEND__REQUESTS__DTO__ : ", FriendRequestsDTO);
        console.log("__PENDING__REQUESTS__00__ : ", FriendRequests);
        return res.send(FriendRequestsDTO);
    }
    async GetFriends(UserId, res) {
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                status: client_1.RELATION.FRIENDS,
                senderId: UserId
            },
            include: {
                receiver: true
            }
        });
        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                status: client_1.RELATION.FRIENDS,
                receiverId: UserId
            },
            include: {
                sender: true
            }
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => AllFriends.push(element.receiver));
        FriendsRowB.forEach(element => AllFriends.push(element.sender));
        return res.status(common_1.HttpStatus.OK).send(AllFriends);
    }
    async Logout(res) {
        return res.status(common_1.HttpStatus.OK)
            .clearCookie('Authorization', { httpOnly: true })
            .send({ 'message': 'done' });
    }
    async Update2FA(me, status, res) {
        if (status === 'true') {
            let user = await this.userService.GetUserById(me);
            if (user.twoFactorAuthSecret === null) {
                const _2faData = await this.tfaService.generateTwoFactorAuthenticationSecret(me, user.email);
                console.log("__TFA__DATA__ : ", _2faData);
                await this.prisma.users.update({
                    where: { id: me },
                    data: {
                        twoFactorAuth: true,
                        twoFactorAuthSecret: _2faData.secret
                    },
                });
            }
            else {
                await this.prisma.users.update({
                    where: { id: me },
                    data: { twoFactorAuth: true },
                });
            }
            return this.Logout(res);
        }
        else if (status === 'false') {
            await this.prisma.users.update({
                where: { id: me },
                data: { twoFactorAuth: false },
            });
            return res.status(common_1.HttpStatus.OK).send({ 'message': "TFA False" });
        }
        return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': "Bad Request" });
    }
    async GetBlackList(UserId, res) {
        let BlockRow = await this.prisma.blocks.findMany({
            where: {
                userId: UserId
            },
            include: {
                blocked: true
            }
        });
        let BlackList = [];
        BlockRow.forEach(element => BlackList.push(element.blocked));
        console.log("__BLACK__LIST__", BlackList);
        return res.status(common_1.HttpStatus.OK).send(BlackList);
    }
};
__decorate([
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "me", null);
__decorate([
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "UploadAvatar", null);
__decorate([
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "UpdateUserName", null);
__decorate([
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "GetRequests", null);
__decorate([
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "GetFriends", null);
__decorate([
    __param(0, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "Logout", null);
__decorate([
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "Update2FA", null);
__decorate([
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "GetBlackList", null);
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        tfa_service_1.TfaService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map