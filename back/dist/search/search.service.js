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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const user_service_1 = require("../user/user.service");
let SearchService = class SearchService {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async FriendsSearch(userId, input, res) {
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                AND: [
                    { status: client_1.RELATION.FRIENDS },
                    { senderId: userId },
                    {
                        receiver: {
                            OR: [
                                { login: { startsWith: input, mode: 'insensitive' } },
                                { displayName: { startsWith: input, mode: 'insensitive' } }
                            ],
                        }
                    }
                ],
            },
            include: { receiver: true }
        });
        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                AND: [
                    { status: client_1.RELATION.FRIENDS },
                    { receiverId: userId },
                    {
                        sender: {
                            OR: [
                                { login: { startsWith: input, mode: 'insensitive' } },
                                { displayName: { startsWith: input, mode: 'insensitive' } }
                            ],
                        }
                    }
                ],
            },
            include: { sender: true }
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => AllFriends.push(element.receiver));
        FriendsRowB.forEach(element => AllFriends.push(element.sender));
        return res.status(common_1.HttpStatus.OK).send(AllFriends);
    }
    async AllUsersSearch(input, res) {
        let MatchedUsers = await this.prisma.users.findMany({
            where: {
                OR: [
                    { login: { startsWith: input, mode: 'insensitive' } },
                    { displayName: { startsWith: input, mode: 'insensitive' } },
                ],
            },
        });
        return res.status(common_1.HttpStatus.OK).send(MatchedUsers);
    }
};
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], SearchService.prototype, "FriendsSearch", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SearchService.prototype, "AllUsersSearch", null);
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map