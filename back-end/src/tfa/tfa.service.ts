import { Injectable, Res, Req, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TfaService {
    constructor (private configService: ConfigService,
                private prisma: PrismaService) {}

    public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        stream.setHeader('content-type','image/png');
        return toFileStream(stream, otpauthUrl);
    }

    async generateTwoFactorAuthenticationSecret(user: number, login: string) {
        const secret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(login, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        return { secret, otpauthUrl };
    }

    async TFAVerification(me: number, userSecret: string) {
        const user = await this.prisma.users.findUnique({
            where: {id: me}
        });
        return authenticator.verify({
            token: userSecret,
            secret: user.twoFactorAuthSecret
        });
    }
}
