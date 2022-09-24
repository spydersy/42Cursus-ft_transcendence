import { Controller, Get, HttpStatus, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserName } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ProfileService } from './profile.service';


@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

  constructor(private profileService: ProfileService,
              private userService: UserService) {}

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

  @Put('update/:id')
  async Update2FA(@Req() req, @Query() query) {
    return 'Update Endpoint Called';
  }
}
