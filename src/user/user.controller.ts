import { Controller, UseGuards, NotFoundException, Post } from '@nestjs/common';
import { Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':id')
    async GetUserByUsername(@Req() req) {
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

    @Get('add/:id')
    async AddFriend(@Req() req) {
        // if (this.userService.)
        console.log(req.user.username);
        console.log(req.params.id);
        console.log(`${req.user.username} Want To Add ${req.params.id} As Friend`);
        return this.userService.AddFriend(req.user.username, req.params.id);
    }


    @Post('block/:id')
    async BlockUser(@Req() req) {
        console.log(req.user.username);
        console.log(req.params.id);
        console.log(`${req.user.username} Want To Block ${req.params.id}`);
        return this.userService.BlockUser(req.user.username, req.params.id);
    }
}
