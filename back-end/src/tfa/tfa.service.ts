import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TfaService {
    constructor (private configService: ConfigService,
                private prisma: PrismaService) {}

    public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }

    async generateTwoFactorAuthenticationSecret(user: number, login: string) {
        console.log("__EMAIL__DBG__ : ", login);
        const secret = authenticator.generateSecret();
        console.log("__SECRET__DBG__ :", secret );
        const otpauthUrl = authenticator.keyuri(login, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        console.log("__OTP__AUTH__URL__DBG__ :", otpauthUrl );
        return { secret, otpauthUrl };
    }

    async TFAVerification(me: number, userSecret: string, @Res() res) {
        const user = await this.prisma.users.findUnique({
            where: {id: me}
        });
        return res.send(authenticator.verify({
            token: userSecret,
            secret: user.twoFactorAuthSecret
        }));
    }
}
