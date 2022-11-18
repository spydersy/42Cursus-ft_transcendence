import { Controller, Get, HttpStatus, Post, Query, Req, Res, Header, UseGuards, UploadedFile, UseInterceptors, Param, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';
import { UserNameDto } from '../dtos/Inputs.dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

  constructor(private profileService: ProfileService,
              private userService: UserService) {}

  @Header("Access-Control-Allow-Origin", process.env.FRONTEND_URL)
  @Get('me')
  async GetUserProfile(@Req() req  , @Query() query, @Res() res: Response) {
    if (query['data']) {
      switch (query['data']) {
        case 'friends':
          return await this.profileService.GetFriends(req.user.userId, res);
        case 'requests':
          return await this.profileService.GetRequests(req.user.userId, res);
        case 'blacklist':
          return await this.profileService.GetBlackList(req.user.userId, res);
        default:
          return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
      }
    }
    return this.profileService.me(req, query, res);
  }

  @Post('updateAvatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async UpdateAvatar(@Req() req, @UploadedFile() file, @Res() res) {
    const uploadedAvatarPath = process.env.BACKEND_URL + "/upload/" + file.filename;
    return this.profileService.UploadAvatar(uploadedAvatarPath, req.user.userId, res);
  }

  @Post('logout')
  async Logout(@Res() res) {
    return this.profileService.Logout(true, res);
  }

  @Get('update2FA')
  async GenerateQrCode(@Req() req, @Query('status') status, @Res() res) {
    if (status === undefined || status !== 'generate') {
      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Request'});
    }
    return this.profileService.Update2FA(req.user.userId, status, undefined, res);
  }

  @Post('update2FA')
  async Update2FA(@Req() req, @Query('status') status, @Query('code') code, @Res() res) {
    if (status === undefined || !(status === 'true' || status === 'false')) {
      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Request'});
    }
    return this.profileService.Update2FA(req.user.userId, status, code, res);
  }

  @Post("updateUsername")
  async UpdateUserName(@Req() req, @Body() newname: UserNameDto, @Res() res) {
    return this.profileService.UpdateUserName(newname.newname, req.user.userId, res);
  }
}
