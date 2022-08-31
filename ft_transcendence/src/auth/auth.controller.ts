import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor (private authservice: AuthService) {
    }

    @Get()
    SigninLogic(@Query() query) {
        return this.authservice.SigninLogic(query);
    }
}
