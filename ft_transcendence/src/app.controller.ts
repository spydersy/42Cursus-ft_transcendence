import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from './user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}



@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    console.log("__PROFILE__CONTROLLER__CALLED__ : ");
    return await this.userService.GetUser(req.user.username);
    // return "Hello JWT Is Working";
  }
}
