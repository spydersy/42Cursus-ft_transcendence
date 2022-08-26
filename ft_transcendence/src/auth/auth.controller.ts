import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private authservice: AuthService) {
    }

    @Get()
    SigninLogic(@Query() query) {
        return this.authservice.SigninLogic(query);
    }
}
