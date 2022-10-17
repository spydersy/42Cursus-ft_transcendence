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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const user_service_1 = require("../user/user.service");
var USERSTAT;
(function (USERSTAT) {
    USERSTAT[USERSTAT["MUTED"] = 0] = "MUTED";
    USERSTAT[USERSTAT["ACCESS"] = 1] = "ACCESS";
    USERSTAT[USERSTAT["NOTFOUND"] = 2] = "NOTFOUND";
})(USERSTAT || (USERSTAT = {}));
let ChatService = class ChatService {
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    async CreatDMChannel(SenderId, ReceiverId) {
        let DMChannel = await this.prisma.channels.findMany({
            where: {
                AND: [
                    { access: client_1.CHANNEL.DM },
                    { users: { some: { userId: SenderId } } },
                    { users: { some: { userId: ReceiverId } } }
                ],
            }
        });
        if (DMChannel.length === 0) {
            let Channel = await this.prisma.channels.create({
                data: { access: client_1.CHANNEL.DM, }
            });
            let Users = await this.prisma.channelsUsers.createMany({
                data: [
                    { userId: SenderId, channelId: Channel.id, permission: client_1.PERMISSION.USER, restriction: client_1.RESCTRICTION.NULL, duration: 0 },
                    { userId: ReceiverId, channelId: Channel.id, permission: client_1.PERMISSION.USER, restriction: client_1.RESCTRICTION.NULL, duration: 0 }
                ]
            });
            console.log("__DM__USERS__DBG__ : ", Users);
        }
        console.log("__DM__CHANNEL__DBG__ : ", DMChannel);
    }
    async GetChannelMessages(me, channelId, res) {
        let channel = await this.GetChannelById(channelId);
        if (channel === null)
            return res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'Channel Not Found' });
        let userChannel = await this.FindUserInChannel(me, channelId);
        if (userChannel === null)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Forbidden' });
        if (userChannel.restriction === client_1.RESCTRICTION.BANNED
            || userChannel.restriction === client_1.RESCTRICTION.MUTED) {
            let now = new Date();
            let restrictionTime = new Date();
        }
        let messages = await this.prisma.messages.findMany({
            where: { channelId: channelId },
            include: { sender: true },
        });
        const blackList = await this.prisma.blocks.findMany({ where: { blockedId: me } });
        console.log("__BLACK__LIST__DBG__ : ", { blackList, me });
        messages.forEach(message => {
            message['displayName'] = message.sender.displayName;
            console.log("__MESSAGE__SENDER__ : ", message.sender);
            for (let index = 0; index < blackList.length; index++) {
                if (message.sender.id === blackList[0].userId) {
                    message.content = "Hidden Content 👻👻👻";
                    break;
                }
            }
            delete message.sender;
        });
        res.status(common_1.HttpStatus.OK).send(messages);
    }
    async SendMessage(me, messageContent, channelId) {
        await this.prisma.messages.create({
            data: {
                senderId: me,
                channelId: channelId,
                content: messageContent,
            }
        });
        await this.prisma.channels.update({
            where: { id: channelId },
            data: { nbMessages: { increment: 1 } },
        });
    }
    async GetMyChannels(me, res) {
        let allChannels = await this.prisma.channels.findMany({
            where: {
                users: { some: { userId: me } }
            },
            include: { users: { include: { user: true } } },
            orderBy: { lastUpdate: 'desc' },
        });
        return res.status(common_1.HttpStatus.OK).send(await this.generateChannelDto(me, allChannels));
    }
    async UpdateUserInChannel(me, user, channelId, role, res) {
        if (await this.CanUpdateChannel(me, channelId) === true) {
            const channel = await this.prisma.channels.findUnique({ where: { id: channelId } });
            if (channel === null || channel.access === client_1.CHANNEL.DM)
                return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Cant Add User' });
            const userProfile = await this.userService.GetUserByLogin(user);
            if (userProfile === null)
                return res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'User Not Found' });
            console.log(userProfile.id);
            await this.prisma.channelsUsers.update({
                where: {
                    userId_channelId: {
                        userId: userProfile.id,
                        channelId: channel.id
                    },
                },
                data: { permission: role }
            });
            return res.status(common_1.HttpStatus.OK).send({ 'message': 'User Updated' });
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Method Not Allowed' });
    }
    async DeleteUserFromChannel(me, user, channelId, res) {
        const channel = await this.prisma.channels.findUnique({ where: { id: channelId } });
        if (channel === null || channel.access === client_1.CHANNEL.DM)
            return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Cant Add User' });
        const userProfile = await this.userService.GetUserByLogin(user);
        if (userProfile === null)
            return res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'User Not Found' });
        if ((userProfile.id === me)
            || (userProfile.id !== me && await this.CanUpdateChannel(me, channelId) === true)) {
            try {
                await this.prisma.channelsUsers.delete({
                    where: {
                        userId_channelId: { userId: userProfile.id, channelId: channelId }
                    }
                });
                res.status(common_1.HttpStatus.OK).send({ 'message': 'User Deleted' });
            }
            catch (_a) {
                res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'User Not Found' });
            }
        }
        res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Forbidden' });
    }
    async UpdateUserRestrictionInChannel(me, user, channel, restriction, duration, res) {
    }
    async AddUserToChannel(me, user, channelId, res) {
        if (await this.CanUpdateChannel(me, channelId) === true) {
            const channel = await this.prisma.channels.findUnique({
                where: { id: channelId },
            });
            if (channel === null || channel.access === client_1.CHANNEL.DM)
                return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Cant Add User' });
            const userProfile = await this.userService.GetUserByLogin(user);
            if (userProfile === null)
                return res.status(common_1.HttpStatus.NOT_FOUND).send({ 'message': 'User Not Found' });
            try {
                await this.prisma.channelsUsers.create({
                    data: {
                        userId: userProfile.id,
                        channelId: channelId,
                        permission: client_1.PERMISSION.USER
                    }
                });
                return res.status(common_1.HttpStatus.CREATED).send({ 'message': 'User Added Succesefully' });
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.CONFLICT).send({ 'message': 'User Already Exist' });
            }
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send({ 'message': 'Method Not Allowed' });
    }
    async CreateRoom(me, channelName, type, members, password, channelIcone, res) {
        let access = null;
        if (type === 'private')
            access = client_1.CHANNEL.PRIVATE;
        else if (type === 'public')
            access = client_1.CHANNEL.PUBLIC;
        else if (type === 'protected')
            access = client_1.CHANNEL.PROTECTED;
        let channel = await this.prisma.channels.create({
            data: {
                access: access,
                name: channelName,
                picture: channelIcone,
                password: password
            }
        });
        await this.prisma.channelsUsers.create({
            data: { userId: me, channelId: channel.id, permission: client_1.PERMISSION.OWNER }
        });
        if (members.length !== 0) {
            console.log("__members__ : ", members);
            let manyUsers;
            manyUsers = [];
            console.log("__many__members__00__ : ", manyUsers);
            members.forEach(element => {
                manyUsers.push({ userId: parseInt(element, 10), channelId: channel.id, permission: client_1.PERMISSION.USER });
            });
            console.log("__MANY__members__ : ", manyUsers);
            let addedUseres = await this.prisma.channelsUsers.createMany({
                data: manyUsers,
            });
        }
        return res.status(common_1.HttpStatus.CREATED).send({ 'message': "Channel Created Successfully" });
    }
    async generateChannelDto(me, channels) {
        let myChannels = [];
        channels.forEach(chnl => {
            let Channel = {
                channelId: chnl.id,
                access: chnl.access,
                name: chnl.name,
                picture: chnl.picture,
                password: chnl.password,
                nbMessages: chnl.nbMessages,
                lastUpdate: chnl.lastUpdate,
                users: [],
            };
            chnl.users.forEach(user => {
                let userdto = {
                    permission: user.permission,
                    restriction: user.restriction,
                    restrictionTime: user.restrictionTime,
                    duration: user.duration,
                    login: user.user.login,
                    displayName: user.user.displayName,
                    defaultAvatar: user.user.defaultAvatar,
                };
                if (user.user.id === me)
                    Channel.users.splice(0, 0, userdto);
                else
                    Channel.users.push(userdto);
            });
            myChannels.push(Channel);
        });
        return myChannels;
    }
    async CanUpdateChannel(userId, channelId) {
        const userChannelPair = await this.prisma.channelsUsers.findUnique({
            where: {
                userId_channelId: { userId, channelId },
            },
        });
        if (userChannelPair === null
            || userChannelPair.permission === client_1.PERMISSION.USER)
            return false;
        return true;
    }
    async GetChannelById(channelId) {
        return await this.prisma.channels.findUnique({ where: { id: channelId } });
    }
    async FindUserInChannel(userId, channelId) {
        let userChannel = await this.prisma.channelsUsers.findUnique({
            where: { userId_channelId: { userId, channelId } }
        });
        return userChannel;
    }
    async PostMessageValidationLayer(me, messageContent, channelId) {
        const userInChannel = await this.FindUserInChannel(me, channelId);
        if (userInChannel === null)
            return USERSTAT.NOTFOUND;
    }
    async GetMessageValidationLayer(me, messageContent, channelId) {
        return true;
    }
};
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "GetChannelMessages", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "GetMyChannels", null);
__decorate([
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "UpdateUserInChannel", null);
__decorate([
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "DeleteUserFromChannel", null);
__decorate([
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "UpdateUserRestrictionInChannel", null);
__decorate([
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "AddUserToChannel", null);
__decorate([
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Array, String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "CreateRoom", null);
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map