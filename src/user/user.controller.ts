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
    async GetUserByUsername(@Req() req, @Query() query, @Res() res) {
        // if (query['data']) {
        //     let UserIdDTO = await this.userService.GetUserByLogin(req.user.username);
        //     console.log("__USER__DBG__ : ", UserIdDTO);
        //     if (UserIdDTO === null)
        //         return res.send("9WEEEEDTIIIIIIIIIIHA");
        //     switch (query['data']) {
        //         case 'achievements':
        //           return" await this.profileService.GetFriends(req.user.userId, res)";
        //         case 'friends':
        //               return await this.profileService.GetFriends(UserIdDTO.id, res);
        //         case 'games':
        //             return" await this.profileService.GetFriends(req.user.userId, res)";
        //         default:
        //             return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
        //     }
        // }
        return this.userService.GetUserByUsername(req.user.username, req.params.id, res);
    }
    @Get('relation/:id')

    @Get('relation/:id')
    async RelationsHandler(@Req() req, @Query() query, @Res() res) {
        console.log("__QUERIES__DBG__ : ", query);
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
        return {"message": "Bad Request01"};
    }

}
// bigdaddy join select
