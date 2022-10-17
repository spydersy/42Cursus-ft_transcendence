import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class TfaService {
    private configService;
    constructor(configService: ConfigService);
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<void>;
    generateTwoFactorAuthenticationSecret(user: number, email: string): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
}
