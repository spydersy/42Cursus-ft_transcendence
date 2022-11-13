import { ClassSerializerInterceptor, Controller, Header, Post, HttpStatus, Res, UseGuards, Req, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TfaService } from './tfa.service';
import { Request } from 'express';

@Controller('2fa')
export class TfaController {
    constructor(private tfaService: TfaService) {}

    @UseGuards(JwtAuthGuard)
    @Get('generate')
    async register(@Res() response: Response, @Req() req) {
    const { otpauthUrl } = await this.tfaService.generateTwoFactorAuthenticationSecret(req.user.userId, req.user.Login);
    return this.tfaService.pipeQrCodeStream(response, otpauthUrl);
    }
}
