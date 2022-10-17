import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TfaService {
    constructor (private configService: ConfigService) {}

    public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }

    async generateTwoFactorAuthenticationSecret(user: number, email: string) {
        const secret = authenticator.generateSecret();
        console.log("__SECRET__DBG__ :", secret );
        const otpauthUrl = authenticator.keyuri(email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        console.log("__OTP__AUTH__URL__DBG__ :", otpauthUrl );
        return { secret, otpauthUrl };
    }
}
