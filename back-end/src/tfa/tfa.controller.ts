import { ClassSerializerInterceptor, Controller, Header, Post, UseInterceptors, Res, UseGuards, Req, Get } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TfaService } from './tfa.service';

@Controller('2fa')
export class TfaController {
    constructor(private tfaService: TfaService) {}

    @Get('generate')
    @UseGuards(JwtAuthGuard)
    async register(@Res() response: Response, @Req() req) {
    const { otpauthUrl } = await this.tfaService.generateTwoFactorAuthenticationSecret(req.user.userId, req.user.email);

    return this.tfaService.pipeQrCodeStream(response, otpauthUrl);
  }
}
