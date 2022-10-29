import { ClassSerializerInterceptor, Controller, Header, Post, UseInterceptors, Res, UseGuards, Req, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TfaService } from './tfa.service';

@UseGuards(JwtAuthGuard)
@Controller('2fa')
export class TfaController {
    constructor(private tfaService: TfaService) {}

    @Get('generate')
    async register(@Res() response: Response, @Req() req) {
    const { otpauthUrl } = await this.tfaService.generateTwoFactorAuthenticationSecret(req.user.userId, req.user.Login);
    console.log("vjnfsljvjbsdfflfvnnsdffkjbsdfkjjblsdfjjbnsdljnb ::::::: ", otpauthUrl);
    return this.tfaService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Get('validate')
    async TFAVerification(@Req() req, @Query() query, @Res() res) {
      return this.tfaService.TFAVerification(req.user.userId, query['code']);
    }
}
