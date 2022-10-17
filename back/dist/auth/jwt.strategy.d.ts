import { Strategy } from "passport-jwt";
import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
export declare const JWT_SECRET: string;
export declare class WsGuard implements CanActivate {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    canActivate(context: any): Promise<boolean | any>;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
        email: any;
    }>;
}
export {};
