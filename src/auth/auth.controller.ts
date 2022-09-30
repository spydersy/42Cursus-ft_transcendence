import { Controller, Get, Query, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response as Res } from 'express';

@Controller('auth')
export class AuthController {

    constructor (private authservice: AuthService) {
    }

    @Get()
    SigninLogic(@Query() query, @Response() res: Res) {
        return this.authservice.SigninLogic(query, res);
    }
}
