"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("./constants");
let cookieExtractor = function (req) {
    var token = null;
    if (req && req.headers.cookie) {
        token = decodeURI(req.headers.cookie);
        if (token.indexOf('Authorization') != -1) {
            token = token.substring(token.indexOf('Authorization') + 14 + 7);
        }
    }
    console.log("__JWT__TOKEN__ : >>", token, "<<");
    return token;
};
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret
        });
    }
    async validate(payload) {
        return { userId: payload.Id, username: payload.Login };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map