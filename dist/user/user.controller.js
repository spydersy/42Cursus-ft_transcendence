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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const profile_service_1 = require("../profile/profile.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, profileService) {
        this.userService = userService;
        this.profileService = profileService;
    }
    async GetAllUsers(req, res) {
        this.userService.GetAllUsers(res);
    }
    async GetUserByUsername(req, res) {
        return this.userService.GetUserByUsername(req.user.username, req.params.id, res);
    }
    async GetFriends(req, res) {
        return this.userService.GetFriends(req.user.username, req.params.id, res);
    }
    async GetAchievements(req, res) {
        return res.send([false, true, false, true, false, true, false, true]);
    }
    async GetGames(req, res) {
        return res.send([]);
    }
    async RelationsHandler(req, query, res) {
        console.log("__QUERIES__DBG__ : ", query);
        if (query['event']) {
            switch (query['event']) {
                case 'block':
                    return await this.userService.BlockUser(req.user.username, req.params.id, res);
                case 'unblock':
                    return await this.userService.UnblockUser(req.user.username, req.params.id, res);
                case 'add':
                    return await this.userService.AddFriend(req.user.username, req.params.id, res);
                case 'cancel':
                    return await this.userService.CancelRequest(req.user.username, req.params.id, res);
                case 'accept':
                    return await this.userService.AcceptFriendRequest(req.user.username, req.params.id, res);
                case 'decline':
                    return await this.userService.DeclineFriendRequest(req.user.username, req.params.id, res);
                case 'unfriend':
                    return await this.userService.UnfriendUser(req.user.username, req.params.id, res);
                default:
                    return res.status(common_1.HttpStatus.BAD_REQUEST).set().send({ "message": "Bad Request" });
            }
        }
        return { "message": "Bad Request01" };
    }
};
__decorate([
    (0, common_2.Get)(),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetAllUsers", null);
__decorate([
    (0, common_2.Get)(':id'),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserByUsername", null);
__decorate([
    (0, common_2.Get)('friends/:id'),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetFriends", null);
__decorate([
    (0, common_2.Get)('achievements/:id'),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetAchievements", null);
__decorate([
    (0, common_2.Get)('games/:id'),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetGames", null);
__decorate([
    (0, common_2.Get)('relation/:id'),
    __param(0, (0, common_2.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "RelationsHandler", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        profile_service_1.ProfileService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map