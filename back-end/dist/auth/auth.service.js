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
exports.AuthService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(httpService, userService, jwtTokenService, configService) {
        this.httpService = httpService;
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
        this.configService = configService;
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
            .post(this.configService.get('42API_TOKEN_ENDPOINT'), HeadersRequest)
            .pipe((0, rxjs_1.map)(res_ => {
            return (res_.data);
        })));
    }
    async ClaimUserProfile(Token, code) {
        try {
            const HeadersRequest = {
                'Authorization': Token['token_type'] + ' ' + Token['access_token'],
                'clien_id': this.configService.get('42API_CLIENT_ID'),
                'client_secret': this.configService.get('42API_CLIENT_SECRET'),
                'code': code,
                'redirect_uri': this.configService.get('AUTH_ENDPOINT'),
            };
            return await (0, rxjs_1.lastValueFrom)(this.httpService
                .get(this.configService.get('42API_PROFILE_ENDPOINT'), { headers: HeadersRequest }));
        }
        catch (_a) {
            console.log("__ERROR__WHILE__GETTING__USER__DATA__");
        }
    }
    async GetUserToken(code) {
        try {
            const HeadersRequest = {
                'grant_type': 'authorization_code',
                'client_id': this.configService.get('42API_CLIENT_ID'),
                'client_secret': this.configService.get('42API_CLIENT_SECRET'),
                'redirect_uri': this.configService.get('AUTH_ENDPOINT'),
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
        const payload = { Id: user.Id,
            Login: user.Login,
            TwoFactorAuth: user.TwoFactorAuth,
            Email: user.Email
        };
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }
    async SigninLogic(query, res) {
        let UserDto;
        if (this.Check42ApiQueryCode(query) === true) {
            const Token = await this.GetUserToken(query['code']);
            const UserProfile = await this.ClaimUserProfile(Token, query['code']);
            UserDto = this.userService.GenerateUserDto(UserProfile['data']);
            if (await this.userService.FindUserById(UserDto.Id) === false) {
                this.userService.AddUserToDB(UserDto);
            }
            let JWT = await this.GenerateJWT(UserDto);
            if (UserDto.TwoFactorAuth === true) {
            }
            return res
                .status(common_1.HttpStatus.OK).
                set({
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': this.configService.get('FRONTEND_URL'),
                'Access-Control-Allow-Headers': this.configService.get('FRONTEND_URL')
            })
                .cookie('Authorization', 'Bearer ' + JWT.access_token, { httpOnly: true })
                .redirect(this.configService.get('FRONTEND_URL'));
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
    __metadata("design:paramtypes", [axios_1.HttpService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map