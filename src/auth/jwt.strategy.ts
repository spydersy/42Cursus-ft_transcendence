import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";

export const JWT_SECRET = process.env.JWT_SECRET;

let cookieExtractor = function( req: Request) {
    var token : String = null;
    console.log("__DBG__COOKIES__JWT__ : ", req.headers.cookie);
    if (req && req.headers.cookie) {
        token = decodeURI(req.headers.cookie);
        if (token.indexOf('Authorization') != -1) {
            token = token.substring(token.indexOf('Authorization') + 14 + 7);
        }
    }
    console.log("__JWT__TOKEN__ : >>", token, "<<");
    return token;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        })
    }

    async validate(payload: any) {
        return {userId: payload.Id, username: payload.Login, email: payload.email}
    }
}