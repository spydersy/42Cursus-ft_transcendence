import { Controller, Get, HttpStatus, Post, Query, Req, Res, Header, UseGuards, UploadedFile, UseInterceptors, Param, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

  constructor(private profileService: ProfileService,
              private userService: UserService) {}

  @Header("Access-Control-Allow-Origin", "http://localhost:3000")


  @Get('me')
  async GetUserProfile(@Req() req  , @Query() query, @Res() res: Response) {
    if (query['data']) {
      switch (query['data']) {
        case 'achievements':
          return res.send("this.userService.GetAchievements()");
        case 'friends':
          return await this.profileService.GetFriends(req.user.userId, res);
        case 'games':
          return res.send("this.userService.GetGames()");
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
    const uploadedAvatarPath = `http://localhost:8000/upload/${file.filename}`;
    return this.profileService.UploadAvatar(uploadedAvatarPath, req.user.userId, res);
  }

  @Get('logout')
  async Logout(@Res() res) {
    return this.profileService.Logout(res);
  }

  @Get('update2FA')
  async Update2FA(@Req() req, @Query('status') status, @Res() res) {
    if (status === undefined) {
      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Request'});
    }
    return this.profileService.Update2FA(req.user.userId, status, res);
  }

  @Put("updateUsername/:newname")
  async UpdateUserName(@Req() req, @Param('newname') newName, @Res() res) {
    console.log("__BODY__DBG__", newName);
    return this.profileService.UpdateUserName(newName, req.user.userId, res);
  }
}