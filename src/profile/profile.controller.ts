import { Controller, Get, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
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
  async GetUserProfile(@Req() req , @Query() query, @Res() res: Response) {
    if (query['data']) {
      switch (query['data']) {
        case 'achievements':
          return res.send("this.userService.GetAchievements()");
          break;
        case 'friends':
          return res.send("this.userService.GetFriends()");
          break;
        case 'games':
          return res.send("this.userService.GetGames()");
          break;        
        case 'requests':
          return await this.userService.GetRequests(req.user.userId, res);
          break;
        case 'blacklist':
          return res.send("this.userService.GetBlackList()");
          break;

        default:
          return res.send({"message": "Bad Request"});
      }
    }
    return this.profileService.me(req, res);
  }

  @Put('update/:id')
  async Update2FA(@Req() req, @Query() query) {
    return 'Update Endpoint Called';
  }
}
