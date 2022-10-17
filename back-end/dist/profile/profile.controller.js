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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_service_1 = require("../user/user.service");
const profile_service_1 = require("./profile.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const app_utils_1 = require("../app.utils");
let ProfileController = class ProfileController {
    constructor(profileService, userService) {
        this.profileService = profileService;
        this.userService = userService;
    }
    async GetUserProfile(req, query, res) {
        if (query['data']) {
            switch (query['data']) {
                case 'achievements':
                    return res.send("this.userService.GetAchievements()");
                case 'friends':
                    return await this.profileService.GetFriends(req.user.userId, res);
                case 'games':
                    return res.send("this.userService.GetGames()");
                case 'requests':
                    return await this.profileService.GetRequests(req.user.userId, res);
                case 'blacklist':
                    return await this.profileService.GetBlackList(req.user.userId, res);
                default:
                    return res.status(common_1.HttpStatus.BAD_REQUEST).send({ "message": "Bad Request" });
            }
        }
        return this.profileService.me(req, query, res);
    }
    async UpdateAvatar(req, file, res) {
        const uploadedAvatarPath = `/back-end/upload/${file.filename}`;
        return this.profileService.UploadAvatar(uploadedAvatarPath, req.user.userId, res);
    }
    async Logout(res) {
        console.log("__LOGOUT__ENDPOINT__DBG__");
        return this.profileService.Logout(res);
    }
    async Update2FA(req, status, res) {
        if (status === undefined) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send({ 'message': 'Bad Request' });
        }
        return this.profileService.Update2FA(req.user.userId, status, res);
    }
    async UpdateUserName(req, newname, res) {
        console.log("__BODY__DBG__", newname);
        return this.profileService.UpdateUserName(newname, req.user.userId, res);
    }
};
__decorate([
    (0, common_1.Header)("Access-Control-Allow-Origin", "/front-end"),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "GetUserProfile", null);
__decorate([
    (0, common_1.Post)('updateAvatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: './upload',
            filename: app_utils_1.editFileName,
        }),
        fileFilter: app_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "UpdateAvatar", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "Logout", null);
__decorate([
    (0, common_1.Get)('update2FA'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "Update2FA", null);
__decorate([
    (0, common_1.Put)("updateUsername/:newname"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('newname')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "UpdateUserName", null);
ProfileController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        user_service_1.UserService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map