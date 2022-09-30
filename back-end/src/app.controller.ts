import { Controller, ForbiddenException, Get, NotFoundException, Query, Req, UseGuards, Res, Post, Body, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserName } from './dtos/Inputs.dto';
import { Response } from 'express';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private userService: UserService) {}

  @Get('upload/:imgpath')
  async getUploadedFile(@Param('imgpath') image, @Res() res) {
    this.appService.getUploadedFile(image, res);
  }
}
