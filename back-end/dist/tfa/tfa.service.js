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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TfaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
let TfaService = class TfaService {
    constructor(configService) {
        this.configService = configService;
    }
    async pipeQrCodeStream(stream, otpauthUrl) {
        return (0, qrcode_1.toFileStream)(stream, otpauthUrl);
    }
    async generateTwoFactorAuthenticationSecret(user, email) {
        const secret = otplib_1.authenticator.generateSecret();
        console.log("__SECRET__DBG__ :", secret);
        const otpauthUrl = otplib_1.authenticator.keyuri(email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        console.log("__OTP__AUTH__URL__DBG__ :", otpauthUrl);
        return { secret, otpauthUrl };
    }
};
TfaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TfaService);
exports.TfaService = TfaService;
//# sourceMappingURL=tfa.service.js.map