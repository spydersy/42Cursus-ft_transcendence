import { Controller, UseGuards, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { Get, Req } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
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
                    return this.userService.AddFriend(req.user.username, req.params.id, res);
                // case 'accept':
                    // return "__RELATION__HANDLER__CALLED__ : ACCEPT";
                // case 'decline':
                    // return "__RELATION__HANDLER__CALLED__ : DECLINE";
                // case 'unfriend':
                    // return "__RELATION__HANDLER__CALLED__ : DECLINE";


                default:
                    return {"message": "Bad Request00"};
            }
        }
        return {"message": "Bad Request01"};
    }

}
// bigdaddy join select