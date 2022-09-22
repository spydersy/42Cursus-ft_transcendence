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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("src/user/user.service");
let AuthService = class AuthService {
    constructor(httpService, userService, jwtTokenService) {
        this.httpService = httpService;
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
    }
    Check42ApiQueryCode(query) {
        if (query['error'] || !query['code']) {
            return false;
        }
        return true;
    }
    HandleSigninErrors(query) {
        console.log("// Do Something ...");
        return "// Do Something ...";
    }
    async ClaimToken(HeadersRequest) {
        return (0, rxjs_1.lastValueFrom)(this.httpService
            .post('https://api.intra.42.fr/oauth/token', HeadersRequest)
            .pipe((0, rxjs_1.map)(res_ => {
            return (res_.data);
        })));
    }
    async ClaimUserProfile(Token, code) {
        try {
            const HeadersRequest = {
                'Authorization': Token['token_type'] + ' ' + Token['access_token'],
                'clien_id': 'b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20',
                'client_secret': '3b1dc5f372c8dd6e2c5763598c2ed5151a465bbc33f2527c6c819d70070b6e3a',
                'code': code,
                'redirect_uri': 'http://localhost:3000/auth',
            };
            return await (0, rxjs_1.lastValueFrom)(this.httpService
                .get('https://api.intra.42.fr/v2/me', { headers: HeadersRequest }));
        }
        catch (_a) {
            console.log("__ERROR__WHILE__GETTING__USER__DATA__");
        }
    }
    async GetUserToken(code) {
        try {
            const HeadersRequest = {
                'grant_type': 'authorization_code',
                'client_id': 'b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20',
                'client_secret': '3b1dc5f372c8dd6e2c5763598c2ed5151a465bbc33f2527c6c819d70070b6e3a',
                'redirect_uri': 'http://localhost:3000/auth',
                'code': code,
            };
            const token = await this.ClaimToken(HeadersRequest);
            return token;
        }
        catch (_a) {
            console.log("__ERROR__ID__00");
        }
    }
    async GenerateJWT(user) {
        const payload = { Id: user.Id, Login: user.Login };
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }
    async SigninLogic(query, res) {
        let UserDto;
        if (this.Check42ApiQueryCode(query) === true) {
            const Token = await this.GetUserToken(query['code']);
            const UserProfile = await this.ClaimUserProfile(Token, query['code']);
            UserDto = this.userService.GenerateUserDto(UserProfile['data']);
            if (await this.userService.UserExist(UserDto) === false) {
                this.userService.AddUserToDB(UserDto);
                let JWT = await this.GenerateJWT(UserDto);
                return res.cookie('Authorization', 'Bearer ' + JWT.access_token, { httpOnly: true }).json({ 'message': 'DONE00' });
            }
            else {
                let JWT = await this.GenerateJWT(UserDto);
                return res.cookie('Authorization', 'Bearer ' + JWT.access_token, { httpOnly: true }).json({ 'message': 'DONE01' });
            }
        }
        else {
            this.HandleSigninErrors(query);
        }
        return `Hello ${UserDto.UsualFullName}`;
    }
};
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AuthService.prototype, "Check42ApiQueryCode", null);
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthService.prototype, "HandleSigninErrors", null);
__decorate([
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "SigninLogic", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map