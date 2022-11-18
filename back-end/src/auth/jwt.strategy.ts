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
import { WsException } from '@nestjs/websockets';

export const JWT_SECRET = process.env.JWT_SECRET;

let cookieExtractor = function( req: Request) {
    var token : String = null;
    if (req && req.headers.cookie) {
        token = decodeURI(req.headers.cookie);
        if (token.indexOf('Authorization') != -1) {
            token = token.substring(token.indexOf('Authorization') + 14 + 7);
        }
    }
    return token;
}

@Injectable()
export class WsGuard implements CanActivate {

    constructor( private jwtService: JwtService,
                 private prisma: PrismaService) {}

    async canActivate(
      context: any,
    ) : Promise<boolean | any> {
        if (context.args[0].handshake.headers.cookie !== undefined) {
            let token = decodeURI(context.args[0].handshake.headers.cookie);
            if (token.indexOf('Authorization=Bearer ') != -1)
                token = token.substring(token.indexOf('Authorization=Bearer ') + 14 + 7);
            try {
                this.jwtService.verify(token, { secret: JWT_SECRET});
                return true;
            } catch {
                throw new UnauthorizedException("WEBSOCKET UNAUTHORIZED");
            }
        }
        return false;
    }
}

@Injectable()
export class WsGuard2 implements CanActivate {

    constructor( private jwtService: JwtService,
                 private prisma: PrismaService) {}

    async canActivate(
      context: any,
    ) : Promise<boolean | any> {
        if (context?.headers?.cookie !== undefined) {
            let token = decodeURI(context?.headers?.cookie);
            if (token.indexOf('Authorization=Bearer ') != -1)
                token = token.substring(token.indexOf('Authorization=Bearer ') + 14 + 7);
            try {
                this.jwtService.verify(token, { secret: JWT_SECRET});
                return true;
            } catch {
                throw new WsException('Invalid credentials.');
            }
        }
        throw new WsException('Invalid credentials.');
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

