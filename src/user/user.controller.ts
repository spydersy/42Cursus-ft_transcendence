import { Controller, UseGuards, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { Get, Req } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':id')
    async GetUserByUsername(@Req() req, @Query() query) {
        let user: any;
        try {
            if ((user = await this.userService.GetUserByLogin(req.params.id)) === null)
            throw new NotFoundException();
        }
        catch {
            return {"statusCode":404, "message": `${req.params.id} does not exist`, "error":"Not Found"};
        }
        return user;
    }

    @Get() 
    async GetAllUsers(@Req() req, @Res() res){
        this.userService.GetAllUsers(res);
    }

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
                    return {"message": "Bad Request00"};
            }
        }
        return {"message": "Bad Request01"};
    }

}
// bigdaddy join select
