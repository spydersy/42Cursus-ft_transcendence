import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";
import { CanActivate, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";
import { JwtSignOptions } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { decode } from "punycode";
import { SOCKET } from "@prisma/client";

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

@Injectable()
export class WsGuard implements CanActivate {

    constructor( private jwtService: JwtService,
                 private prisma: PrismaService) {}

    async canActivate(
      context: any,
    ) : Promise<boolean | any> {
        console.log("__BEARER__TOKEN__DBG__00__ : ", context.args[0].conn.id);
        if (context.args[0].handshake.headers.cookie !== undefined) {
            console.log("__BEARER__TOKEN__DBG__01__ : ", context.args[0].handshake.headers.cookie);
            const bearerToken = context.args[0].handshake.headers.cookie.split('%20')[1];
            console.log("__BEARER__TOKEN__AFTER__SPLIT__DBG__ : ", bearerToken);

            try {
                const decoded = this.jwtService.verify(bearerToken, { secret: JWT_SECRET});
                console.log("__DECODED__TOKEN__DBG__ : ", decoded);
                try {
                    const ret = await this.prisma.websockets.create({
                        data: {
                            socketId: context.args[0].conn.id,
                            userId: decoded.Id,
                            userLogin: decoded.Login,
                        }
                    });
                    const OldStats = await this.prisma.websockets.findMany({
                        where: {
                            userId: decoded.Id,
                            type: SOCKET.ONLLINE,
                        },
                    });
                    if (OldStats.length === 1)
                        return true;
                    return false;
                } catch {
                    return false;
                }
                return true;
            } catch {
                console.log("I WILL THROW A 401 EXCEPTION ");
                throw new UnauthorizedException("WEBSOCKET UNAUTHORIZED");
            }
        }
        return false;
    }
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
