import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RELATION } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService,
                private userService: UserService) {}

    async FriendsSearch(userId: number, input: string, @Res() res) {
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                AND: 
                [
                    { status: RELATION.FRIENDS},
                    { senderId: userId},
                    { 
                        receiver: {
                            OR: [
                                { login: {startsWith: input, mode: 'insensitive'}},
                                { displayName: {startsWith: input, mode: 'insensitive'}}
                            ],
                        }
                    }
                ],                
            },
            include: { receiver: true}
        });

        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                AND:
                [
                    { status: RELATION.FRIENDS},
                    { receiverId: userId},
                    {
                        sender: {
                            OR: [
                                {login: {startsWith: input, mode: 'insensitive'}},
                                {displayName: {startsWith: input, mode: 'insensitive'}}
                            ],
                        }
                    }
                ],
            },
            include: { sender: true}
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => AllFriends.push(element.receiver));
        FriendsRowB.forEach(element => AllFriends.push(element.sender));
        return res.status(HttpStatus.OK).send(AllFriends);
    }

    async AllUsersSearch(input: string, @Res() res) {
        let MatchedUsers = await this.prisma.users.findMany({
            where: {
                OR: [
                    {login: {startsWith: input, mode: 'insensitive'}},
                    {displayName: {startsWith: input, mode: 'insensitive'}},
                ],
            },
        });
        return res.status(HttpStatus.OK).send(MatchedUsers);
    }
}
