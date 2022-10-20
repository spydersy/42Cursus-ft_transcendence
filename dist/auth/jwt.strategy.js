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
exports.JwtStrategy = exports.WsGuard = exports.JWT_SECRET = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
exports.JWT_SECRET = process.env.JWT_SECRET;
let cookieExtractor = function (req) {
    var token = null;
    // console.log("__DBG__COOKIES__JWT__ : ", req.headers.cookie);
    if (req && req.headers.cookie) {
        token = decodeURI(req.headers.cookie);
        if (token.indexOf('Authorization') != -1) {
            token = token.substring(token.indexOf('Authorization') + 14 + 7);
        }
    }
    // console.log("__JWT__TOKEN__ : >>", token, "<<");
    return token;
};
let WsGuard = class WsGuard {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        console.log("__BEARER__TOKEN__DBG__00__ : ", context.args[0].handshake.headers.cookie);
        if (context.args[0].handshake.headers.cookie !== undefined) {
            console.log("__BEARER__TOKEN__DBG__01__ : ", context.args[0].handshake.headers.cookie);
            const bearerToken = context.args[0].handshake.headers.cookie.split('%20')[1];
            console.log("__BEARER__TOKEN__AFTER__SPLIT__DBG__ : ", bearerToken);
            try {
                const decoded = this.jwtService.verify(bearerToken, { secret: exports.JWT_SECRET });
                console.log("__DECODED__TOKEN__DBG__ : ", decoded);
                try {
                    const ret = await this.prisma.websockets.create({
                        data: {
                            socketId: context.args[0].conn.id,
                            userId: decoded.Id,
                            userLogin: decoded.Login,
                            type: client_1.SOCKET.ONLINE,
                        }
                    });
                }
                catch (_a) {
                    console.log("___AAAAAA____00__");
                }
                console.log("___AAAAAA____11__");
                const OldStats = await this.prisma.websockets.findMany({
                    where: {
                        userId: decoded.Id,
                        type: client_1.SOCKET.ONLINE,
                    },
                });
                if (OldStats.length === 1) {
                    console.log("__RETURN__TRUE__00__");
                    return true;
                }
                console.log("__RETURN__FALSE__00__");
                return false;
            }
            catch (_b) {
                throw new common_1.UnauthorizedException("WEBSOCKET UNAUTHORIZED");
            }
        }
        console.log("__RETURN__FALSE__02__");
        return false;
    }
};
WsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], WsGuard);
exports.WsGuard = WsGuard;
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: exports.JWT_SECRET,
        });
    }
    async validate(payload) {
        return { userId: payload.Id, username: payload.Login, email: payload.email };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map