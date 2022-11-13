import { Controller, Get, Query, Response, Req, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response as Res } from 'express';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor (private authservice: AuthService) {
    }

    @Get()
    SigninLogic(@Query() query, @Response() res: Res) {
        return this.authservice.SigninLogic(query, res);
    }

    @Post('validate2FA')
    async Validate2FA(@Req() req: Request, @Query() query, @Response() res) {
        if (req.cookies['2FA_PUBLICKEY'] !== undefined && req.cookies['2FA_PUBLICKEY'] !== null)
          return this.authservice.TFAVerificationRes(req.cookies['2FA_PUBLICKEY'], query['code'], res);
        else
          return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Error Unvalid Cookie'});
    }
}
