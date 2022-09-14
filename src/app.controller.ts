import { Controller, ForbiddenException, Get, NotFoundException, Query, Req, UseGuards, Res, Post, Body, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserName } from './dtos/Inputs.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private userService: UserService) {}


  // @UseGuards(JwtAuthGuard)
  // @Get('updatelogin')
  // async UpdateLogin(@Req() req, @Query() query, @Res() res: Response) {
  //   let ret = await this.userService.UpdateLogin(req.user, query);
  //   console.log(ret);
  //   return res.status(ret.statusCode).send(ret);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('users/:id')
  // async GetUserByUsername(@Req() req, @Query() query) {
  //   console.log(req.params.id);
  //   try {
  //     if (await this.userService.FindUserByLogin(req.params.id) === false)
  //       throw new NotFoundException();
  //   }
  //   catch {
  //     return "404 - User Not Found";
  //   }
  //   return "WEWE";//
  // }
}
