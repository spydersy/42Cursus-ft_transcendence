import { BadRequestException, forwardRef, HttpCode, HttpStatus, Inject, Injectable, MethodNotAllowedException, NotFoundException, Query, Req, Res } from '@nestjs/common';
import { CHANNEL, RELATION } from '@prisma/client';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class UserService {


    public constructor(private prisma: PrismaService,
                private chatService: ChatService) {}

    /*
    *  Endpoints Calls : **************************************************************************
    */

    async GetnbFriends(UserMe: string, User: string) : Promise<number> {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);

        if (UserMeDto === null || UserDto === null)
            return 0;
        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true)
            return 0;
        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                status: RELATION.FRIENDS,
                senderId: UserDto.id
            },
            include: {
                receiver: true
            }
        });

        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                status: RELATION.FRIENDS,
                receiverId: UserDto.id
            },
            include: {
                sender: true
            }
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => AllFriends.push(element.receiver));
        FriendsRowB.forEach(element => AllFriends.push(element.sender));
        return AllFriends.length;
    }

    async GetRank(UserMe: string, User: string) : Promise<number> {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);

        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true) {
            return -1;
        }
        const rankedUsers = await this.prisma.users.findMany({
            select: {id: true,
                    level: true},
            orderBy:{ level: 'desc'},
        });
        const range: number = rankedUsers[0].level - rankedUsers[rankedUsers.length - 1].level;
        for (let index = 0; index < rankedUsers.length; index++) {
            if (UserDto.id === rankedUsers[index].id)
                return ((rankedUsers[index].level + Math.abs(rankedUsers[rankedUsers.length - 1].level)) / range) * 100;
        }
    }

    async GetFriends(UserMe: string, User: string, @Res() res) {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);

        if (UserMeDto === null || UserDto === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true)
            return res.status(HttpStatus.FORBIDDEN).send([]);

        let FriendsRowA = await this.prisma.friends.findMany({
            where: {
                status: RELATION.FRIENDS,
                senderId: UserDto.id
            },
            include: {
                receiver: true
            }
        });

        let FriendsRowB = await this.prisma.friends.findMany({
            where: {
                status: RELATION.FRIENDS,
                receiverId: UserDto.id
            },
            include: {
                sender: true
            }
        });
        let AllFriends = [];
        FriendsRowA.forEach(element => {
            delete element.receiver.twoFactorAuth;
            delete element.receiver.twoFactorAuthSecret;
            AllFriends.push(element.receiver)
        });
        FriendsRowB.forEach(element => {
            delete element.sender.twoFactorAuth;
            delete element.sender.twoFactorAuthSecret;
            AllFriends.push(element.sender)
        });
        return res.status(HttpStatus.OK).send(AllFriends);
    }

    async GetAchievements(me: number, user: string, @Res() res) {
        let ret: boolean[] = [false, false, false, false, false, false];
        const userDto = await this.GetUserByLogin(user);

        if (userDto === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        if (await this.IsBlockedUser(userDto.id, me) === true)
            return res.status(HttpStatus.OK).send(ret);
        return res.status(HttpStatus.OK).send(userDto.achievement);
    }

    async GetUserByUsername(Me: string, User: string, @Res() res) {

        let MeDto = await this.GetUserByLogin(Me);
        let UserDto = await this.GetUserByLogin(User);

        try {
            if (MeDto === null || UserDto === null) {
                throw new NotFoundException();
            }
        }
        catch {
            return res.status(HttpStatus.NOT_FOUND).send({'message' : 'User Not Found'});
        }
        delete UserDto.twoFactorAuth;
        delete UserDto.twoFactorAuthSecret;
        try {
            if (await this.IsBlockedUser(UserDto.id, MeDto.id) === true)  {
                throw new  MethodNotAllowedException();
            }
        }
        catch {
            return res.status(HttpStatus.FORBIDDEN).send({'message' : 'Forbidden : User Blocked you'}); // DO SOMETHING
        }
        UserDto['relation'] = 'NOTHING';
        UserDto['rank'] = await this.GetRank(Me, User);
        if (await this.IsBlockedUser(MeDto.id, UserDto.id) === true) {
            UserDto['relation'] = 'BLOCKED';
            return res.status(HttpStatus.OK).send(UserDto);
        }
        let FriendsStat = await this.FriendsRelationExist(MeDto.id, UserDto.id);
        if (FriendsStat !== null) {
            if (FriendsStat.status === RELATION.PENDING && FriendsStat.senderId != MeDto.id)
                UserDto['relation'] = 'WAITING';
            else
                UserDto['relation'] = FriendsStat['status'];
        }
        UserDto['nbFriends'] = await this.GetnbFriends(Me, Me);
        UserDto['dmChannel'] = null;
        const dmChannel = await this.prisma.channels.findMany({
            where: {
                AND: [
                    {access: CHANNEL.DM},
                    { users: { some: {userId: MeDto.id}}},
                    { users: { some: {userId: UserDto.id}}}
                ],
            }
        });
        if (dmChannel.length !== 0)
            UserDto['dmChannel'] = dmChannel[0].id;
        return res.status(HttpStatus.OK).send(UserDto);
    }

    async BlockUser(User: string, BlockedUser: string, @Res() res) {
        let UserDto = await this.GetUserByLogin(User);
        let BlockedUserDto = await this.GetUserByLogin(BlockedUser);

        if (UserDto === null || BlockedUserDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
        if (UserDto.id === BlockedUserDto.id)
            return res.status(HttpStatus.FORBIDDEN).send({"message": "Cant Block Yourself :) "});
        if (await this.IsBlockedUser(UserDto.id, BlockedUserDto.id) === true)
            return res.status(HttpStatus.OK).send({"message": `${User} Already Blocked ${BlockedUser}`});
        if (await this.IsBlockedUser(BlockedUserDto.id, UserDto.id) === true)
            return res.status(HttpStatus.FORBIDDEN).send({"message": `Cant Block this user | Reason : ${BlockedUser} Already Blocked ${User}`});
        await this.prisma.users.update({
            where: {id: UserDto.id},
            data: {achievement: UserDto.achievement}
        });
        const user = await this.prisma.blocks.create({
            data: {
                userId: UserDto.id,
                blockedId: BlockedUserDto.id,
            },
        });
        this.DeleteFriendRelation(UserDto.id, BlockedUserDto.id);
        UserDto.achievement[2] = true;
        await this.prisma.users.update({
            where: {
                id: UserDto.id
            },
            data: {
                achievement: UserDto.achievement
            }
        });
        return res.status(HttpStatus.OK).send({"message": "DONE"});
    }

    async UnblockUser(User: string, BlockedUser: string, @Res() res) {
        let UserDto = await this.GetUserByLogin(User);
        let BlockedUserDto = await this.GetUserByLogin(BlockedUser);

        if (UserDto === null || BlockedUserDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
        if (UserDto.id === BlockedUserDto.id)
            return res.status(HttpStatus.FORBIDDEN).send({"message": "Cant Unblock Yourself :) "});
        if (await this.IsBlockedUser(BlockedUserDto.id, UserDto.id) === true)
            return res.status(HttpStatus.FORBIDDEN).send({"message": `Cant Unblock this user | Reason : ${BlockedUser} Already Blocked ${User}`});
        const Delete = await this.prisma.blocks.deleteMany({
            where: {
                userId: UserDto.id,
                blockedId: BlockedUserDto.id,
            }
        });
        return res.status(HttpStatus.OK).send({"message": "DONE"});
    }

    async AddFriend(Sender: string, Receiver: string, @Res() res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);

        if (ReceiverDto === null || SenderDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
        if (await this.IsBlockedUser(ReceiverDto.id, SenderDto.id) ||
            await this.IsBlockedUser(SenderDto.id, ReceiverDto.id)) {
            return res.status(HttpStatus.FORBIDDEN).send({"message": `${Receiver} blocked ${Sender}`});
        }
        if (await this.FriendsRelationExist(SenderDto.id, ReceiverDto.id) === null)
            return await this.SendFriendRequest(SenderDto.id, ReceiverDto.id, res);
        return res.status(HttpStatus.OK).send({"message": "Relation Already Exist"});
    }

    async CancelRequest(Sender: string, Receiver: string, @Res() res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);

        if (ReceiverDto === null || SenderDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
        let relatin = await this.prisma.friends.deleteMany({
            where: {
                senderId: SenderDto.id,
                receiverId: ReceiverDto.id,
                status: RELATION.PENDING,
            }
        })
        return res.status(HttpStatus.OK).send({"message": "DONE"});
    }

    async AcceptFriendRequest(Receiver: string, Sender: string, @Res() res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);

        if (ReceiverDto === null || SenderDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
        let NewRelation = await this.prisma.friends.updateMany({
            where: {
                receiverId: ReceiverDto.id,
                senderId: SenderDto.id,
                status: RELATION.PENDING,
            },
            data: {
                status: RELATION.FRIENDS,
            }
        });
        await this.chatService.CreatDMChannel(SenderDto.id, ReceiverDto.id); // DO SOMETHING . . .
        return res.status(HttpStatus.OK).send({"message": NewRelation.count});
    }

    async DeclineFriendRequest(Receiver: string, Sender: string, @Res() res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);

        if (ReceiverDto === null || SenderDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
        const DeniedRequest = await this.prisma.friends.deleteMany({
            where: {
                senderId: SenderDto.id,
                receiverId: ReceiverDto.id,
                status: RELATION.PENDING
            }
        });
        return res.status(HttpStatus.OK).send({"message": DeniedRequest.count});
    }

    async UnfriendUser(Receiver: string, Sender: string, @Res() res) {
        let SenderDto = await this.GetUserByLogin(Sender);
        let ReceiverDto = await this.GetUserByLogin(Receiver);

        if (ReceiverDto === null || SenderDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
        this.DeleteFriendRelation(SenderDto.id, ReceiverDto.id);
        return res.status(HttpStatus.OK).send({"message": "DONE"});
    }

    async SendFriendRequest(User1Id: number, User2Id: number, @Res() res) {
        if (User1Id === User2Id)
            return res.status(HttpStatus.FORBIDDEN).send({ "message": 'Wach Nta 7maaaaar'});
            let FriendsStat = await this.prisma.friends.findMany({
            where: {
                senderId: User1Id,
                receiverId: User2Id,
            } || {
                senderId: User2Id,
                receiverId: User1Id,
            },
        });
        if (FriendsStat.length === 0) {
            const user = await this.prisma.friends.create({
                data: {
                    senderId: User1Id,
                    receiverId: User2Id,
                    status: RELATION.PENDING,
                },
            });
            return res.status(HttpStatus.OK).send({ "message": 'DONE00'});
        }
        else
            return res.status(HttpStatus.OK).send({ "message": 'RELATION ALREADY EXIST'});
    }

    async AddUserToDB(UserProfile : User) {
        const user = await this.prisma.users.create({
            data: {
                id: UserProfile.Id,
                login: UserProfile.Login,
                displayName: UserProfile.UsualFullName,
                defaultAvatar: UserProfile.DefaultAvatar,
                level: 100,
                twoFactorAuth: false,
            },
        });
    }

    async GetRequests(UserId: number, @Res() res) {
        let requests = await this.prisma.friends.findMany({
            where: {
                receiverId: UserId,
                status: RELATION.PENDING,
            }
        });
        return res.send(requests);
    }

    async    GetUserById(Id: number) : Promise<any> {
        let user = await this.prisma.users.findUnique({
            where: {
                id: Id,
            },
        });
        return user;
    }

    /*
    *  Search/Find : ******************************************************************************
    */
        async    GetUserByLogin(username: string) : Promise<any> {
            let user = await this.prisma.users.findUnique({
                where: {
                    login: username,
                },
            });
            return user;
        }

        async FindUserById(UserId: number) {
            let user = await this.GetUserById(UserId);
            if (user) {
                return true;
            }
            return false;
        }

        async FindUserByLogin(UserLogin: string) {
            let user = await this.GetUserByLogin(UserLogin);
            if (user) {
                return true;
            }
            return false;
        }

        async GetAllUsers(@Res() res) {
            const allUser = await this.prisma.users.findMany({
                select: {
                    login: true,
                    displayName: true,
                    defaultAvatar: true,
                    wins: true,
                    losses: true,
                    level: true,
                },
                orderBy:{ level: 'desc'},
            });
            return res.send(allUser);
        }
    /*
    *  Utils : ************************************************************************************
    */

        GenerateUserDto(UserProfile) : User {
            const user : User = {
                Id: UserProfile['id'],
                Email: UserProfile['email'],
                Login: UserProfile['login'],
                UsualFullName: UserProfile['usual_full_name'],
                DefaultAvatar: `https://myanimelist.tech/api/avatar?&name=${UserProfile['login']}&animeName=One_Piece`,
                UploadedAvatar: "",
                Status: "online",
                Notifications: {},
                Wins: 0,
                Losses: 0,
                Level: 0,
                TwoFactorAuth: UserProfile['twoFactorAuth'],
            }
            return user;
        }

    /*
    *  User Relations : ***************************************************************************
    */

        async IsBlockedUser(User : number, BlockedUserId : number) {
            let BlockStat = await this.prisma.blocks.findFirst({
                where: {
                    userId: User,
                    blockedId: BlockedUserId,
                },
            });
            if (BlockStat === null)
                return false;
            return true;
        }

        async FriendsRelationExist(Sender : number, Receiver: number) {
            let FriendshipStat = await this.prisma.friends.findFirst({
                where: {
                    OR: [
                        { AND: [ {senderId: Sender}, {receiverId: Receiver}]},
                        { AND: [ {senderId: Receiver}, {receiverId: Sender}]},
                    ],
                }
            });
            return FriendshipStat;
        }

        async DeleteFriendRelation(User1: number, User2: number){
            const Delete = await this.prisma.friends.deleteMany({
                where: {
                    senderId: User1,
                    receiverId: User2,
                }
            });
            const Delete1 = await this.prisma.friends.deleteMany({
                where: {
                    senderId: User2,
                    receiverId: User1,
                }
            });
        }
}
