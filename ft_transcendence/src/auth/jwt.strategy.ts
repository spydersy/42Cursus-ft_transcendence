import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from './constants';
import { Request } from 'express';
import { platform } from "os";

let cookieExtractor = function( req: Request) {
    var token : String = null;
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

            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: cookieExtractor,
            // jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
            //     let data = request?.cookies["auth-cookie"];
            //     if(!data){
            //         return null;
            //     }
            //     return data.token
            // }]),
            // jwtFromRequest: ExtractJwt.fromExtractors([
                // (request: Request) => {
                //   let data = request?.cookies["auth-cookie"];
                //   if (!data) {
                    // return null;
                //   }

                //   return data.token;
                // },
            //   ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        return {userId: payload.Id, username: payload.Login}
    }
}