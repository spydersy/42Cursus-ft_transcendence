import { Controller, UseGuards, NotFoundException, Post, Put, Query } from '@nestjs/common';
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
    async RelationsHandler(@Req() req, @Query() query) {
        console.log("__QUERIES__DBG__ : ", query);
        return {query};
        if (query['event'] === 'block') {
            console.log("__RELATIONS__ENDPOINT__CALLED__ : __BLOCK__FRIEND__");
            return this.userService.AddFriend(req.user.username, req.params.id);
        }
        else if (query['event'] === 'add') {
            console.log("__RELATIONS__ENDPOINT__CALLED__ : __ADD__FRIEND__");
            return this.userService.AddFriend(req.user.username, req.params.id);
        }
        return {"message": "Bad Request"};
    }

    // @Get('block')
    // async BlockUser(@Req() req) {
    //     console.log(req.user.username);
    //     console.log(req.params.id);
    //     console.log(`${req.user.username} Want To Block ${req.params.id}`);
    //     return this.userService.BlockUser(req.user.username, req.params.id);
    // }
}
