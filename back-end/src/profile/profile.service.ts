import { HttpStatus, Injectable, Query } from '@nestjs/common';
import { Req, Res } from '@nestjs/common';
import { UserNameDto } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { RELATION } from '@prisma/client';
import { TfaService } from 'src/tfa/tfa.service';
import { Console } from 'console';
import { ConfigService } from '@nestjs/config';
import { GameService } from 'src/game/game.service';

@Injectable()
export class ProfileService {

    constructor(private userService: UserService,
                private prisma: PrismaService,
                private tfaService: TfaService,
                private configService: ConfigService) {}

    async me(@Req() req , @Query() query, @Res() res: Response) {
        // JUST FOR TEST
        let ForbiddenString : string = "";
        let TestUserNameDTO: UserNameDto ={
            newname: ForbiddenString,
        }
        // console.log("__TEST__USER_NNAME__DTO__ : ", TestUserNameDTO);
        let profile = await this.userService.GetUserByLogin(req.user.username);
        console.log("WEWE11 : ", req.user.username, req.user.username);
        profile['nbFriends'] = await this.userService.GetnbFriends(req.user.username, req.user.username);
        // console.log("__USER__PROFILE__ : ", profile);
        return res.send(profile);
    }

    async UploadAvatar(uploadedAvatart: string, userId: number, @Res() res) {
        let userDto = await this.prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        userDto.achievement[2] = true;
        let uploaded = await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                defaultAvatar: uploadedAvatart,
                achievement: userDto.achievement,
            }
        });
        console.log("__UPLOAD__uploaded__ : ", uploaded);
        return res.status(HttpStatus.CREATED).send(uploadedAvatart);
    }

    async UpdateUserName(newName: string, userId: number, @Res() res) {
        console.log("__NEW__NAME__ : ", newName);
        try {
            await this.prisma.users.update({
                where: { id: userId},
                data: { displayName: newName},
            });
            return res.status(HttpStatus.CREATED).send({"new name": newName});
        }
        catch {
            return res.status(HttpStatus.FORBIDDEN).send({"message": 'Username Already Taken'});
        }
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

    async Logout(redirectionn : Boolean,@Res() res) {
        return res.status(HttpStatus.OK)
                    .clearCookie('Authorization', {httpOnly: true})
                    .send({'message': 'done'});
    }

    async Update2FA(me: number, status: string, code: string, @Res() res) {
        let user = await this.userService.GetUserById(me);

        if (status === 'true' && code !== undefined) {
            if (user.twoFactorAuth === false && user.twoFactorAuthSecret !== null) {
                if (await this.tfaService.TFAVerification(me, code) === true) {
                    await this.prisma.users.update({
                        where: { id: me},
                        data: { twoFactorAuth: true},
                    });
                    return res.status(HttpStatus.OK).send({'message': '2FA enabeled'});
                }
                else
                    return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Unvalid Code'});
            }
            else
                return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Request'});
        }
        else if (status === 'generate') {
            const usertfa = await this.prisma.users.findUnique({
                where: { id: me },
            });
            if (user.twoFactorAuth === false) {
                const _2faData = await this.tfaService.generateTwoFactorAuthenticationSecret(me, user.login);
                await this.prisma.users.update({
                    where: { id: me },
                    data: {
                        twoFactorAuthSecret: _2faData.secret
                    },
                });
                return this.tfaService.pipeQrCodeStream(res, _2faData.otpauthUrl);
            }
            else
                return res.status(HttpStatus.FORBIDDEN).send({'message': 'Not Allowed'});
        }
        else if (status === 'false') {
            await this.prisma.users.update({
                where: { id: me },
                data: {
                    twoFactorAuth: false,
                    twoFactorAuthSecret: null
                },
            });
            return res.status(HttpStatus.OK).send({'message': "TFA False"});
        }
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
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
