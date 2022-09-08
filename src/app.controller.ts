import { Injectable, Controller, ForbiddenException, Get, HttpStatus, NotFoundException, Query, Req, UseGuards, ExecutionContext, UnauthorizedException, Res, Post, Body, UseInterceptors, UploadedFile, ParseFilePipeBuilder, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { UserService } from './user/user.service';
import { UserName } from './dtos/Inputs.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {  } from '@nestjs/common';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private userService: UserService) {}


  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // uploadFile(@UploadedFile(
  //   new ParseFilePipeBuilder()
  //   .addFileTypeValidator({
  //     fileType: 'png',
  //   })
  //   .addMaxSizeValidator({
  //     maxSize: 100000,
  //   })
  //   .build({
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  //   }),
  // ) file: Express.Multer.File) {
  //   console.log("__FILE__ : ", file);
  // }

  @Put('test')
  PostSomethingForTest(@Req() req: Request, @Body() body) {
    console.log("__REQUEST__ : ", req);
    console.log("__BODY__ : ", body);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    let ForbiddenString : string = "";
    let TestUserNameDTO: UserName ={
      UserName: ForbiddenString,
    }
    console.log("__TEST__USER_NNAME__DTO__ : ", TestUserNameDTO);
    return await this.userService.GetUser(req.user.username);
  }


  @UseGuards(JwtAuthGuard)
  @Get('updatelogin')
  async UpdateLogin(@Req() req, @Query() query, @Res() res: Response) {
    let ret = await this.userService.UpdateLogin(req.user, query);
    console.log(ret);
    return res.status(ret.statusCode).send(ret);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('avatars')
  async UploadAvatar(@Body() req: Body) {
    console.log({req});
  }

  @UseGuards(JwtAuthGuard)
  @Get('avatars/:id')
  async GetAvatar(@Req() req, @Query() query) {
    console.log(req.params.id);
    try {
      if (await this.userService.UserExist(req.params.id) === false)
        throw new NotFoundException();
    }
    catch {
      return "404 - User Not Found";
    }
    return "WEWE";//
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/')
  async UsersRoot() {
    throw new ForbiddenException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async GetUserByUsername(@Req() req, @Query() query) {
    console.log(req.params.id);
    try {
      if (await this.userService.UserExist(req.params.id) === false)
        throw new NotFoundException();
    }
    catch {
      return "404 - User Not Found";
    }
    return "WEWE";//
  }
}
