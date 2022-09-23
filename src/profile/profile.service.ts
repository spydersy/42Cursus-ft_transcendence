import { Injectable, Query } from '@nestjs/common';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserName } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { query, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { RELATION } from '@prisma/client';

@Injectable()
export class ProfileService {

    constructor(private userService: UserService,
                private prisma: PrismaService) {}

    async me(@Req() req , @Query() query, @Res() res: Response) {
        // JUST FOR TEST
        let ForbiddenString : string = "";
        let TestUserNameDTO: UserName ={
            UserName: ForbiddenString,
        }
        console.log("__TEST__USER_NNAME__DTO__ : ", TestUserNameDTO);
        if (query['friends']) {
            console.log("AAAAA");
            let profile = await this.userService.GetUserByLogin(req.user.username);
        return res.set({'Access-Control-Allow-Origin': 'http://localhost:3000'}).send("__FRIENDS__");
        return "test00";
        }
        let profile = await this.userService.GetUserByLogin(req.user.username);
        return res.set({'Access-Control-Allow-Origin': 'http://localhost:3000'}).send(profile);
    }

    async GetRequests( UserId: number, @Res() res) {
        let requests = await this.prisma.friends.findMany({
            where: {
                receiverId: UserId,
                status: RELATION.PENDING,
            },
            include: {
                sender: {
                    select: {
                        login: true,
                    }
                }
            }
        });
        console.log("__PENDING__REQUESTS__00__ : ", requests[0]);
        console.log("__PENDING__REQUESTS__11__ : ", requests[1]);
        return res.set({'Access-Control-Allow-Origin': 'http://localhost:3000'}).send(requests);
        // return res.set().send();// requests;
    }

    async GetFriends(@Req() req) {
        let Friends = await this.prisma.friends.findMany({
            where: {
                receiver: req.user.userId,
                status: RELATION.FRIENDS,
            } && {
                sender: req.user.userId,
                status: RELATION.FRIENDS,
            }
        });
        console.log("__FRIENDS__LIST__ : ", Friends);
        return Friends;
    }
}
