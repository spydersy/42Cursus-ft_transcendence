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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const app_utils_1 = require("../app.utils");
const chat_service_1 = require("./chat.service");
const Inputs_dto_1 = require("../dtos/Inputs.dto");
const client_1 = require("@prisma/client");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async AddUserToChannel(req, userChannelPair, res) {
        return this.chatService.AddUserToChannel(req.user.userId, userChannelPair.user, userChannelPair.channelId, res);
    }
    async UpdateUserInChannel(req, userChannelPair, role, res) {
        if (role && (role === 'admin' || role === 'user'))
            return this.chatService.UpdateUserInChannel(req.user.userId, userChannelPair.user, userChannelPair.channelId, role === 'admin' ? client_1.PERMISSION.ADMIN : client_1.PERMISSION.USER, res);
        return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': 'Query Not Set Properly' });
    }
    async UpdateUserRestrictionInChannel(req, userRestriction, res) {
        return this.chatService.UpdateUserRestrictionInChannel(req.user.userId, userRestriction.user, userRestriction.channelId, userRestriction.restriction, userRestriction.duration, res);
    }
    async DeleteUserFromChannel(req, channelId, res) {
        if (channelId && (channelId === 'admin' || channelId === 'user'))
            return this.chatService.DeleteUserFromChannel(req.user.userId, req.params.user, channelId, res);
        return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': 'Query Not Set Properly' });
    }
    async GetMyChannels(req, res) {
        return this.chatService.GetMyChannels(req.user.userId, res);
    }
    async GetMessages(req, res) {
        return this.chatService.GetChannelMessages(req.user.userId, req.params.channelId, res);
    }
    async CreateRoom(file, req, channelData, res) {
        console.log("__BODY__DBG__ : ", channelData);
        console.log("___FILE___ : ", file);
        let ChannelIcone = "http://localhost:8000/upload/defaultChannelIcon.jpg";
        if (file !== undefined)
            ChannelIcone = encodeURI(`http://localhost:8000/upload/${file.filename}`);
        if (channelData === undefined || channelData['name'] === undefined || channelData['type'] === undefined
            && channelData['members'] === undefined) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': "Bad Request" });
        }
        var membersObj = JSON.parse(channelData['members']);
        console.log("__MEMBERS__OBJ__DBG__ : ", membersObj);
        if (channelData['type'] === 'protected' && channelData['password'] === undefined)
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': "Bad Request" });
        if (channelData['type'] === 'protected' && channelData['password'] !== undefined)
            return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], membersObj, channelData['password'], ChannelIcone, res);
        return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], membersObj, "", ChannelIcone, res);
    }
};
__decorate([
    (0, common_1.Post)('AddUser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Inputs_dto_1.ChannelUserDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "AddUserToChannel", null);
__decorate([
    (0, common_1.Post)('UpdateUserPermission'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('role')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Inputs_dto_1.ChannelUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "UpdateUserInChannel", null);
__decorate([
    (0, common_1.Post)('UpdateUserRestriction'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Inputs_dto_1.UserRestrictionDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "UpdateUserRestrictionInChannel", null);
__decorate([
    (0, common_1.Delete)('DeleteUser/:user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('channel')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "DeleteUserFromChannel", null);
__decorate([
    (0, common_1.Get)('myChannels'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "GetMyChannels", null);
__decorate([
    (0, common_1.Get)('messages/:channelId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "GetMessages", null);
__decorate([
    (0, common_1.Post)('createRoom'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('icone', {
        storage: (0, multer_1.diskStorage)({
            destination: './upload',
            filename: app_utils_1.editFileName,
        }),
        fileFilter: app_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "CreateRoom", null);
ChatController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map