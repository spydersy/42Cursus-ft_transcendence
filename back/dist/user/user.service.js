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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const chat_service_1 = require("../chat/chat.service");
let UserService = class UserService {
    constructor(prisma, chatService) {
        this.prisma = prisma;
        this.chatService = chatService;
    }
    async GetnbFriends(UserMe, User) {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);
        console.log("__USER__ME__ : ", UserMe);
        console.log("__USER__     : ", User);
        console.log("__USER__ME__DTO__ : ", UserMeDto);
        console.log("__USER__DTO__     : ", UserDto);
        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true) {
            return 0;
        }
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                status: client_1.RELATION.FRIENDS,
                senderId: UserDto.id
            },
            include: {
                receiver: true
            }
        });
        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                status: client_1.RELATION.FRIENDS,
                receiverId: UserDto.id
            },
            include: {
                sender: true
            }
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => AllFriends.push(element.receiver));
        FriendsRowB.forEach(element => AllFriends.push(element.sender));
        console.log("__NB__FIRNEDS__DBG__ : ", AllFriends.length);
        return AllFriends.length;
    }
    async GetFriends(UserMe, User, res) {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);
        console.log("__USER__ME__DTO__ : ", UserMeDto);
        console.log("__USER__DTO__     : ", UserDto);
        if (UserMeDto === null || UserDto === null)
            return res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'User Not Found' });
        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true)
            return res.status(common_1.HttpStatus.FORBIDDEN).send([]);
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                status: client_1.RELATION.FRIENDS,
                senderId: UserDto.id
            },
            include: {
                receiver: true
            }
        });
        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                status: client_1.RELATION.FRIENDS,
                receiverId: UserDto.id
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
    async GetUserByUsername(Me, User, res) {
        let MeDto = await this.GetUserByLogin(Me);
        let UserDto = await this.GetUserByLogin(User);
        try {
            if (MeDto === null || UserDto === null) {
                throw new common_1.NotFoundException();
            }
        }
        catch (_a) {
            return res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'User Not Found' });
        }
        try {
            if (await this.IsBlockedUser(UserDto.id, MeDto.id) === true) {
                throw new common_1.MethodNotAllowedException();
            }
        }
        catch (_b) {
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Forbidden : User Blocked you' });
        }
        UserDto['relation'] = 'NOTHING';
        if (await this.IsBlockedUser(UserDto.id, MeDto.id) === true) {
            UserDto['relation'] = 'BLOCKED';
            return res.status(common_1.HttpStatus.OK).send(UserDto);
        }
        let FriendsStat = await this.FriendsRelationExist(MeDto.id, UserDto.id);
        if (FriendsStat !== null)
            UserDto['relation'] = FriendsStat['status'];
        UserDto['nbFriends'] = await this.GetnbFriends(Me, Me);
        UserDto['dmChannel'] = null;
        const dmChannel = await this.prisma.channels.findMany({
            where: {
                AND: [
                    { access: client_1.CHANNEL.DM },
                    { users: { some: { userId: MeDto.id } } },
                    { users: { some: { userId: UserDto.id } } }
                ],
            }
        });
        if (dmChannel.length !== 0)
            UserDto['dmChannel'] = dmChannel[0].id;
        console.log("__USER__DTO__DBG__ : ", UserDto);
        return res.status(common_1.HttpStatus.OK).send(UserDto);
    }
    async BlockUser(User, BlockedUser, res) {
        let UserDto = await this.GetUserByLogin(User);
        let BlockedUserDto = await this.GetUserByLogin(BlockedUser);
        if (UserDto === null || BlockedUserDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "Bad Request" });
        console.log(`${User} Want To Block ${BlockedUser}`);
        if (UserDto.id === BlockedUserDto.id)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": "Cant Block Yourself :) " });
        if (await this.IsBlockedUser(UserDto.id, BlockedUserDto.id) === true)
            return res.status(common_1.HttpStatus.OK).send({ "message": `${User} Already Blocked ${BlockedUser}` });
        if (await this.IsBlockedUser(BlockedUserDto.id, UserDto.id) === true)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": `Cant Block this user | Reason : ${BlockedUser} Already Blocked ${User}` });
        const user = await this.prisma.blocks.create({
            data: {
                userId: UserDto.id,
                blockedId: BlockedUserDto.id,
            },
        });
        this.DeleteFriendRelation(UserDto.id, BlockedUserDto.id);
        return res.status(common_1.HttpStatus.OK).send({ "message": "DONE" });
    }
    async UnblockUser(User, BlockedUser, res) {
        let UserDto = await this.GetUserByLogin(User);
        let BlockedUserDto = await this.GetUserByLogin(BlockedUser);
        if (UserDto === null || BlockedUserDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "Bad Request" });
        console.log(`${User} Want To Unblock ${BlockedUser}`);
        if (UserDto.id === BlockedUserDto.id)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": "Cant Unblock Yourself :) " });
        if (await this.IsBlockedUser(BlockedUserDto.id, UserDto.id) === true)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": `Cant Unblock this user | Reason : ${BlockedUser} Already Blocked ${User}` });
        const Delete = await this.prisma.blocks.deleteMany({
            where: {
                userId: UserDto.id,
                blockedId: BlockedUserDto.id,
            }
        });
        return res.status(common_1.HttpStatus.OK).send({ "message": "DONE" });
    }
    async AddFriend(Sender, Receiver, res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);
        if (ReceiverDto === null || SenderDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "User Not Found" });
        if (await this.IsBlockedUser(ReceiverDto.id, SenderDto.id) ||
            await this.IsBlockedUser(SenderDto.id, ReceiverDto.id)) {
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": `${Receiver} blocked ${Sender}` });
        }
        console.log("AA : ", SenderDto.id);
        console.log("BB : ", ReceiverDto.id);
        if (await this.FriendsRelationExist(SenderDto.id, ReceiverDto.id) === null)
            return await this.SendFriendRequest(SenderDto.id, ReceiverDto.id, res);
        return res.status(common_1.HttpStatus.OK).send({ "message": "Relation Already Exist" });
    }
    async CancelRequest(Sender, Receiver, res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);
        if (ReceiverDto === null || SenderDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "User Not Found" });
        let relatin = await this.prisma.friends.deleteMany({
            where: {
                senderId: SenderDto.id,
                receiverId: ReceiverDto.id,
                status: client_1.RELATION.PENDING,
            }
        });
        console.log("__CANCEL__FRIEND__REQUEST__ : ", relatin);
        return res.status(common_1.HttpStatus.OK).send({ "message": "DONE" });
    }
    async AcceptFriendRequest(Receiver, Sender, res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);
        if (ReceiverDto === null || SenderDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "User Not Found" });
        let NewRelation = await this.prisma.friends.updateMany({
            where: {
                receiverId: ReceiverDto.id,
                senderId: SenderDto.id,
                status: client_1.RELATION.PENDING,
            },
            data: {
                status: client_1.RELATION.FRIENDS,
            }
        });
        await this.chatService.CreatDMChannel(SenderDto.id, ReceiverDto.id);
        console.log("__NEW__RELATION__ : ", NewRelation);
        return res.status(common_1.HttpStatus.OK).send({ "message": NewRelation.count });
    }
    async DeclineFriendRequest(Receiver, Sender, res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);
        if (ReceiverDto === null || SenderDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "User Not Found" });
        const DeniedRequest = await this.prisma.friends.deleteMany({
            where: {
                senderId: SenderDto.id,
                receiverId: ReceiverDto.id,
                status: client_1.RELATION.PENDING
            }
        });
        console.log("__DENIED__REQUEST__ : ", DeniedRequest);
        return res.status(common_1.HttpStatus.OK).send({ "message": DeniedRequest.count });
    }
    async UnfriendUser(Receiver, Sender, res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);
        if (ReceiverDto === null || SenderDto === null)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "User Not Found" });
        this.DeleteFriendRelation(SenderDto.id, ReceiverDto.id);
        return res.status(common_1.HttpStatus.OK).send({ "message": "DONE" });
    }
    async SendFriendRequest(User1Id, User2Id, res) {
        console.log("ID1", User1Id);
        console.log("ID2", User2Id);
        if (User1Id === User2Id)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ "message": 'Wach Nta 7maaaaar' });
        let FriendsStat = await this.prisma.friends.findMany({
            where: {
                senderId: User1Id,
                receiverId: User2Id,
            } || {
                senderId: User2Id,
                receiverId: User1Id,
            },
        });
        console.log("__FRIENDS__STAT__ : ", FriendsStat);
        if (FriendsStat.length === 0) {
            const user = await this.prisma.friends.create({
                data: {
                    senderId: User1Id,
                    receiverId: User2Id,
                    status: client_1.RELATION.PENDING,
                },
            });
            return res.status(common_1.HttpStatus.OK).send({ "message": 'DONE00' });
        }
        else
            return res.status(common_1.HttpStatus.OK).send({ "message": 'RELATION ALREADY EXIST' });
    }
    async AddUserToDB(UserProfile) {
        const user = await this.prisma.users.create({
            data: {
                id: UserProfile.Id,
                login: UserProfile.Login,
                displayName: UserProfile.UsualFullName,
                defaultAvatar: UserProfile.DefaultAvatar,
                notifications: UserProfile.Notifications,
                wins: UserProfile.Wins,
                losses: UserProfile.Losses,
                level: UserProfile.Level,
                twoFactorAuth: false,
            },
        });
    }
    async GetRequests(UserId, res) {
        let requests = await this.prisma.friends.findMany({
            where: {
                receiverId: UserId,
                status: client_1.RELATION.PENDING,
            }
        });
        console.log("__PENDING__REQUESTS__ : ", requests);
        return res.send(requests);
    }
    async GetUserById(Id) {
        let user = await this.prisma.users.findUnique({
            where: {
                id: Id,
            },
        });
        console.log(user);
        return user;
    }
    async GetUserByLogin(username) {
        console.log(username);
        let user = await this.prisma.users.findUnique({
            where: {
                login: username,
            },
        });
        console.log(user);
        return user;
    }
    async FindUserById(UserId) {
        let user = await this.GetUserById(UserId);
        if (user) {
            return true;
        }
        return false;
    }
    async FindUserByLogin(UserLogin) {
        let user = await this.GetUserByLogin(UserLogin);
        if (user) {
            return true;
        }
        return false;
    }
    async GetAllUsers(res) {
        let allUser = await this.prisma.users.findMany();
        console.log("__ALL__USERS__ : ", allUser);
        return res.send(allUser);
    }
    GenerateUserDto(UserProfile) {
        const user = {
            Id: UserProfile['id'],
            Email: UserProfile['email'],
            Login: UserProfile['login'],
            UsualFullName: UserProfile['usual_full_name'],
            DefaultAvatar: `https://avatars.dicebear.com/api/croodles-neutral/${UserProfile['login']}.jpg`,
            UploadedAvatar: "",
            Status: "online",
            Notifications: {},
            Wins: 0,
            Losses: 0,
            Level: 0,
            TwoFactorAuth: false,
        };
        return user;
    }
    async IsBlockedUser(User, BlockedUserId) {
        let BlockStat = await this.prisma.blocks.findFirst({
            where: {
                userId: User,
                blockedId: BlockedUserId,
            },
        });
        console.log("__BLOCK__STAT__ : ", BlockStat);
        if (BlockStat === null)
            return false;
        return true;
    }
    async FriendsRelationExist(Sender, Receiver) {
        let FriendshipStat = await this.prisma.friends.findFirst({
            where: {
                OR: [
                    { AND: [{ senderId: Sender }, { receiverId: Receiver }] },
                    { AND: [{ senderId: Receiver }, { receiverId: Sender }] },
                ],
            }
        });
        console.log("__FRIENDS__STAT__DBG__ : ", FriendshipStat);
        return FriendshipStat;
    }
    async DeleteFriendRelation(User1, User2) {
        console.log(User1, User2);
        const Delete = await this.prisma.friends.deleteMany({
            where: {
                senderId: User1,
                receiverId: User2,
            }
        });
        const Delete1 = await this.prisma.friends.deleteMany({
            where: {
                senderId: User2,
                receiverId: User1,
            }
        });
    }
};
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "GetFriends", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "GetUserByUsername", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "BlockUser", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "UnblockUser", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "AddFriend", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "CancelRequest", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "AcceptFriendRequest", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "DeclineFriendRequest", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "UnfriendUser", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "SendFriendRequest", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "GetRequests", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "GetAllUsers", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        chat_service_1.ChatService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map