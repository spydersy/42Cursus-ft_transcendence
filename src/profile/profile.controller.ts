import { Controller, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserName } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ProfileService } from './profile.service';


@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {

  constructor(private profileService: ProfileService) {}

  @Get('me')
  async GetUserProfile(@Req() req , @Res() res: Response) {
    return this.profileService.me(req, res);
  }

  @Get('friends')
  async GetFriend(@Req() req) {
    return this.profileService.GetFriends(req);
  }

  @Get('matchs')
  async GetMatchs(@Req() req) {
    return 'Matchs Endpoint Called';
  }

  @Get('achievements')
  async GetAchievements(@Req() req) {
    return 'Achievements Endpoint Called';
  }

  @Get('requests')
  async GetRequests(@Req() req) {
    return this.profileService.GetRequests(req);
  }

  @Get('blacklist')
  async GetBlackList(@Req() req) {
    return 'Blacklist Endpoint Called';
  }

  @Put('update/2fa')
  async Update2FA(@Req() req) {
    return 'update/2FA Endpoint Called';
  }

  @Put('update/displayname')
  async UpdateDisplayName(@Req() req) {
    return 'update/displayname Endpoint Called';
  }

  @Put('update/avatar')
  async UpdateAvatar(@Req() req) {
    return 'update/avatar Endpoint Called';
  }
}
