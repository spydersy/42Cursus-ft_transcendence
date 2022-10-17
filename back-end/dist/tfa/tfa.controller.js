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
exports.TfaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const tfa_service_1 = require("./tfa.service");
let TfaController = class TfaController {
    constructor(tfaService) {
        this.tfaService = tfaService;
    }
    async register(response, req) {
        const { otpauthUrl } = await this.tfaService.generateTwoFactorAuthenticationSecret(req.user.userId, req.user.email);
        return this.tfaService.pipeQrCodeStream(response, otpauthUrl);
    }
};
__decorate([
    (0, common_1.Get)('generate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "register", null);
TfaController = __decorate([
    (0, common_1.Controller)('2fa'),
    __metadata("design:paramtypes", [tfa_service_1.TfaService])
], TfaController);
exports.TfaController = TfaController;
//# sourceMappingURL=tfa.controller.js.map