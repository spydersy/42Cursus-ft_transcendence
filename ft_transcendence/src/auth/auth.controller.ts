import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private authservice: AuthService) {

    }

    @Get()
    default_auth_get(@Query() query) {
        console.log("__QUERIES__ : ", query);
        return this.authservice.default_auth_get(query);
    }
}
