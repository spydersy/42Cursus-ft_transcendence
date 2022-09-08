import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtConstants } from './constants';
import { Request } from 'express';

let cookieExtractor = function( req: Request) {
    var token : String = null;
    console.log("__REQ__HEADERS__ : ", req.headers);
    if (req && req.headers && req.headers['authorization']) {
        token = decodeURI(req.headers['authorization']);
        if (token.indexOf('Bearer') != -1) {
            token = token.substring(token.indexOf('Bearer') + 7);
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
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        return {userId: payload.Id, username: payload.Login}
    }
}