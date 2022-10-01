import { HttpStatus, Injectable, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserName } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { query, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, RELATION } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';

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
        return res.send("__FRIENDS__");
        return "test00";
        }
        let profile = await this.userService.GetUserByLogin(req.user.username);
        profile['nbFriends'] = await this.userService.GetnbFriends(req.user.username, req.user.username);
        console.log("__USER__PROFILE__ : ", profile);
        return res.send(profile);
    }

    async UploadAvatar(uploadedAvatart: string, userId: number, @Res() res) {
        let uploaded = await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                defaultAvatar: uploadedAvatart,
            }
        });
        console.log("__UPLOAD__uploaded__ : ", uploaded);
        return res.status(HttpStatus.CREATED).send(uploadedAvatart);
    }

    async UpdateUserName(newName: string, userId: number, @Res() res) {
        try {
            this.prisma.users.update({
                where: {
                    id: userId
                },
                data: {
                    displayName: newName,
                }
            });
        }
        catch {
            return res.status(HttpStatus.FORBIDDEN).send({"message": 'Username Already Taken'});
        }
        return res.status(HttpStatus.CREATED).send({"new name": newName});
    }

    async GetRequests( UserId: number, @Res() res) {
        let FriendRequests = await this.prisma.friends.findMany({
            where: {
                receiverId: UserId,
                status: RELATION.PENDING,
            },
            include: {
                sender: true,
            }
        });
        let FriendRequestsDTO = [];
        FriendRequests.forEach(element => {
            FriendRequestsDTO.push(element.sender);
        });
        console.log("__FRIEND__REQUESTS__DTO__ : ", FriendRequestsDTO);
        console.log("__PENDING__REQUESTS__00__ : ", FriendRequests);
        return res.send(FriendRequestsDTO);
        // return res.set().send();// requests;
    }

    async GetFriends(UserId: number, @Res() res) {
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                status: RELATION.FRIENDS,
                senderId: UserId
            },
            include: {
                receiver: true
            }
        });

        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                status: RELATION.FRIENDS,
                receiverId: UserId
            },
            include: {
                sender: true
            }
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => AllFriends.push(element.receiver));
        FriendsRowB.forEach(element => AllFriends.push(element.sender));
        return res.status(HttpStatus.OK).send(AllFriends);
    }

    async GetBlackList(UserId: number, @Res() res) {
        let BlockRow = await this.prisma.blocks.findMany({
            where: {
                userId: UserId
            },
            include: {
                blocked: true
            }
        });

        let BlackList = [];
        BlockRow.forEach(element => BlackList.push(element.blocked));
        console.log("__BLACK__LIST__", BlackList);

        return res.status(HttpStatus.OK).send(BlackList);
    }
}



/* 
    POST http://localhost:8000/chat/createRoom

    Query: Members;
    Body : Name + Pictue + Type + Password;
*/