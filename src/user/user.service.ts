import { BadRequestException, HttpCode, HttpStatus, Injectable, MethodNotAllowedException, NotFoundException, Query, Req, Res } from '@nestjs/common';
import { RELATION } from '@prisma/client';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Utilities } from 'src/app.utils';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class UserService {


    constructor(private prisma: PrismaService,
                private chatService: ChatService) {}

    /*
    *  Endpoints Calls : **************************************************************************
    */

    async GetnbFriends(UserMe: string, User: string) : Promise<number> {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);
        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true) {
            return 0;
        }
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
        console.log("__NB__FIRNEDS__DBG__ : ", AllFriends.length);
        return AllFriends.length;
    }

    async GetFriends(UserMe: string, User: string, @Res() res) {
        let UserMeDto = await this.GetUserByLogin(UserMe);
        let UserDto = await this.GetUserByLogin(User);
        if (await this.IsBlockedUser(UserDto.id, UserMeDto.id) === true) {
            return res.status(HttpStatus.FORBIDDEN).send([]);
        }
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
        return res.status(HttpStatus.OK).send(AllFriends);
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
        try {
            if (await this.IsBlockedUser(UserDto.id, MeDto.id) === true)  {
                throw new  MethodNotAllowedException();
            }
        }
        catch {
            return res.status(HttpStatus.FORBIDDEN).send({'message' : 'Forbidden : User Blocked you'}); // DO SOMETHING
        }
        UserDto['relation'] = null;
        if (await this.IsBlockedUser(UserDto.id, MeDto.id) === true) {
            UserDto['relation'] = 'BLOCKED';
            return res.status(HttpStatus.OK).send(UserDto);
        }
        let FriendsStat = await this.FriendsRelationExist(MeDto.id, UserDto.id);
        if (FriendsStat !== null)
            UserDto['relation'] = FriendsStat['status'];
        UserDto['nbFriends'] = await this.GetnbFriends(Me, Me);
        console.log("__USER__DTO__DBG__ : ", UserDto);
        return res.status(HttpStatus.OK).send(UserDto);
    }

    async BlockUser(User: string, BlockedUser: string, @Res() res) {
        let UserDto = await this.GetUserByLogin(User);
        let BlockedUserDto = await this.GetUserByLogin(BlockedUser);

        if (UserDto === null || BlockedUserDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
            console.log(`${User} Want To Block ${BlockedUser}`);
        if (UserDto.id === BlockedUserDto.id)
            return res.status(HttpStatus.FORBIDDEN).send({"message": "Cant Block Yourself :) "});
        if (await this.IsBlockedUser(UserDto.id, BlockedUserDto.id) === true)
            return res.status(HttpStatus.OK).send({"message": `${User} Already Blocked ${BlockedUser}`});
        if (await this.IsBlockedUser(BlockedUserDto.id, UserDto.id) === true)
            return res.status(HttpStatus.FORBIDDEN).send({"message": `Cant Block this user | Reason : ${BlockedUser} Already Blocked ${User}`});
        const user = await this.prisma.blocks.create({
            data: {
                userId: UserDto.id,
                blockedId: BlockedUserDto.id,
            },
        });
        this.DeleteFriendRelation(UserDto.id, BlockedUserDto.id);
        return res.status(HttpStatus.OK).send({"message": "DONE"});
    }

    async UnblockUser(User: string, BlockedUser: string, @Res() res) {
        let UserDto = await this.GetUserByLogin(User);
        let BlockedUserDto = await this.GetUserByLogin(BlockedUser);

        if (UserDto === null || BlockedUserDto === null)
            return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
            console.log(`${User} Want To Unblock ${BlockedUser}`);

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
        console.log("AA : ", SenderDto.id);
        console.log("BB : ", ReceiverDto.id);
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
        console.log("__CANCEL__FRIEND__REQUEST__ : ", relatin);
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
        console.log("__NEW__RELATION__ : ", NewRelation);
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

        console.log("__DENIED__REQUEST__ : ", DeniedRequest);
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
        console.log("ID1", User1Id)
        console.log("ID2", User2Id)
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
        console.log("__FRIENDS__STAT__ : ", FriendsStat);
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
                notifications: UserProfile.Notifications,
                wins: UserProfile.Wins,
                losses: UserProfile.Losses,
                level: UserProfile.Level,
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
        console.log("__PENDING__REQUESTS__ : ", requests);
        return res.send(requests);
    }

    async    GetUserById(Id: number) : Promise<any> {
        let user = await this.prisma.users.findUnique({
            where: {
                id: Id,
            },
        });
        console.log(user);
        return user;
    }

    /*
    *  Search/Find : ******************************************************************************
    */
        async    GetUserByLogin(username: string) : Promise<any> {
            console.log(username);
            let user = await this.prisma.users.findUnique({
                where: {
                    login: username,
                },
            });
            console.log(user);
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
            let allUser = await this.prisma.users.findMany() ;
            console.log("__ALL__USERS__ : ", allUser)
            return res.send(allUser);
            // return allUser;
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
                DefaultAvatar: `https://avatars.dicebear.com/api/croodles-neutral/${UserProfile['login']}.jpg`,
                UploadedAvatar: "",
                Status: "online",
                Notifications: {},
                Wins: 0,
                Losses: 0,
                Level: 0,
                TwoFactorAuth: false,
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
            console.log("__BLOCK__STAT__ : ", BlockStat);
            if (BlockStat === null)
                return false;
            return true;
        }

        async FriendsRelationExist(Sender : number, Receiver: number) {
            let FriendshipStat = await this.prisma.friends.findFirst({
                where: {
                    SenderId: Sender,
                    ReceiverId: Receiver
                } && {
                        senderId: Receiver,
                        receiverId: Sender
                },
            });
            console.log("__BLOCK__STAT__ : ", FriendshipStat);
            return FriendshipStat;
        }

        async DeleteFriendRelation(User1: number, User2: number){
            console.log(User1, User2);
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
