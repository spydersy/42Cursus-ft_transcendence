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
    console.log("vjnfsljvjbsdfflfvnnsdffkjbsdfkjjblsdfjjbnsdljnb ::::::: ", otpauthUrl);
    return this.tfaService.pipeQrCodeStream(response, otpauthUrl);
    }

    // @Post('validate')
    // async TFAVerification(@Req() req: Request, @Query() query, @Res() res) {
    //   if (req.cookies['2FA_PUBLICKEY'] !== undefined && req.cookies['2FA_PUBLICKEY'] !== null)
    //     return this.tfaService.TFAVerificationRes(req.cookies['2FA_PUBLICKEY'], query['code'], res);
    //   else
    //     return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Error Unvalid Cookie'});
    // }
}
