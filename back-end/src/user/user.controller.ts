import { Controller, UseGuards, NotFoundException, Post, Put, Query, Res, HttpStatus } from '@nestjs/common';
import { Get, Req } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileService } from 'src/profile/profile.service';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService,
                private profileService: ProfileService) {}

    @Get() 
    async GetAllUsers(@Req() req, @Res() res){
        this.userService.GetAllUsers(res);
    }
            
    @Get(':id')
    async GetUserByUsername(@Req() req, @Res() res) {
        return this.userService.GetUserByUsername(req.user.username, req.params.id, res);
    }

    @Get('friends/:id')
    async GetFriends(@Req() req, @Res() res) {
        return this.userService.GetFriends(req.user.username, req.params.id, res);
    }

    @Get('achievements/:id')
    async GetAchievements(@Req() req, @Res() res) {
        return this.userService.GetAchievements(req.user.userId, req.params.id, res);
    }

    @Get('relation/:id')
    async RelationsHandler(@Req() req, @Query() query, @Res() res) {
        if (query['event']) {
            switch (query['event']) {
                case 'block':
                    return await this.userService.BlockUser(req.user.username, req.params.id, res);
                case 'unblock':
                    return await this.userService.UnblockUser(req.user.username, req.params.id, res);
                case 'add':
                    return await this.userService.AddFriend(req.user.username, req.params.id, res);
                case 'cancel':
                    return await this.userService.CancelRequest(req.user.username, req.params.id, res);
                case 'accept':
                    return await this.userService.AcceptFriendRequest(req.user.username, req.params.id, res);
                case 'decline':
                    return await this.userService.DeclineFriendRequest(req.user.username, req.params.id, res);
                case 'unfriend':
                    return await this.userService.UnfriendUser(req.user.username, req.params.id, res);
                default:
                    return res.status(HttpStatus.BAD_REQUEST).set().send({"message": "Bad Request"});
            }
        }
        return {"message": "Bad Request"};
    }
}
