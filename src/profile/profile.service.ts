import { Injectable } from '@nestjs/common';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserName } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { RELATION } from '@prisma/client';

@Injectable()
export class ProfileService {

    constructor(private userService: UserService,
                private prisma: PrismaService) {}

    async me(@Req() req , @Res() res: Response) {
        let ForbiddenString : string = "";
        let TestUserNameDTO: UserName ={
            UserName: ForbiddenString,
        }
        console.log("__TEST__USER_NNAME__DTO__ : ", TestUserNameDTO);
        let profile = await this.userService.GetUserByLogin(req.user.username);
        return res.set({'Access-Control-Allow-Origin': 'http://localhost:3001'}).send(profile);
    }

    async GetRequests(@Req() req) {
        let requests = await this.prisma.friends.findMany({
            where: {
                receiver: req.user.userId,
                status: RELATION.PENDING,
            }
        });
        console.log("__PENDING__REQUESTS__ : ", requests);
        return requests;
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
