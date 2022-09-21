import { HttpCode, HttpStatus, Injectable, Query, Req, Res } from '@nestjs/common';
import { RELATION } from '@prisma/client';
import { ChatService } from 'src/chat/chat.service';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService,
                private chatService: ChatService) {}

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
                uploadedAvatar: UserProfile.UploadedAvatar,
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
    *  Endpoints Calls : **************************************************************************
    */
        async BlockUser(User: string, BlockedUser: string, @Res() res) {
            let UserDto = await this.GetUserByLogin(User);
            let BlockedUserDto = await this.GetUserByLogin(BlockedUser);

            if (UserDto === null || BlockedUserDto === null)
                return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
                console.log(`${User} Want To Block ${BlockedUser}`);
            if (UserDto.Id === BlockedUserDto.Id)
                return res.status(HttpStatus.FORBIDDEN).send({"message": "Cant Block Yourself :) "});
            if (await this.IsBlockedUser(UserDto.Id, BlockedUserDto.Id) === true)
                return res.status(HttpStatus.OK).send({"message": `${User} Already Blocked ${BlockedUser}`});
            if (await this.IsBlockedUser(BlockedUserDto.Id, UserDto.Id) === true)
                return res.status(HttpStatus.FORBIDDEN).send({"message": `Cant Block this user | Reason : ${BlockedUser} Already Blocked ${User}`});
            const user = await this.prisma.blocks.create({
                data: {
                    userId: UserDto.Id,
                    blockedId: BlockedUserDto.Id,
                },
            });
            this.DeleteFriendRelation(UserDto.Id, BlockedUserDto.Id);
            return res.status(HttpStatus.OK).send({"message": "DONE"});
        }

        async UnblockUser(User: string, BlockedUser: string, @Res() res) {
            let UserDto = await this.GetUserByLogin(User);
            let BlockedUserDto = await this.GetUserByLogin(BlockedUser);

            if (UserDto === null || BlockedUserDto === null)
                return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request"});
                console.log(`${User} Want To Unblock ${BlockedUser}`);

            if (UserDto.Id === BlockedUserDto.Id)
                return res.status(HttpStatus.FORBIDDEN).send({"message": "Cant Unblock Yourself :) "});

            if (await this.IsBlockedUser(BlockedUserDto.Id, UserDto.Id) === true)
                return res.status(HttpStatus.FORBIDDEN).send({"message": `Cant Unblock this user | Reason : ${BlockedUser} Already Blocked ${User}`});

            const Delete = await this.prisma.blocks.deleteMany({
                where: {
                    userId: UserDto.Id,
                    blockedId: BlockedUserDto.Id,
                }
            });
            return res.status(HttpStatus.OK).send({"message": "DONE"});
        }

        async AddFriend(Sender: string, Receiver: string, @Res() res) {
            let SenderDto = await this.GetUserByLogin(Sender);
            let ReceiverDto = await this.GetUserByLogin(Receiver);

            if (ReceiverDto === null || SenderDto === null)
                return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
            if (await this.IsBlockedUser(ReceiverDto.Id, SenderDto.Id) ||
                await this.IsBlockedUser(SenderDto.Id, ReceiverDto.Id)) {
                return res.status(HttpStatus.FORBIDDEN).send({"message": `${Receiver} blocked ${Sender}`});
            }
            if (await this.FriendsRelationExist(SenderDto.Id, ReceiverDto.Id) === false)
                return await this.SendFriendRequest(SenderDto.Id, ReceiverDto.Id, res);
            return res.status(HttpStatus.OK).send({"message": "Relation Already Exist"});
        }

        async AcceptFriendRequest(Receiver: string, Sender: string, @Res() res) {
            let SenderDto = await this.GetUserByLogin(Sender);
            let ReceiverDto = await this.GetUserByLogin(Receiver);

            if (ReceiverDto === null || SenderDto === null)
                return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"});
            let NewRelation = await this.prisma.friends.updateMany({
                where: {
                    receiverId: ReceiverDto.Id,
                    senderId: SenderDto.Id,
                    status: RELATION.PENDING,
                },
                data: {
                    status: RELATION.FRIENDS,
                }
            });
            await this.chatService.CreatDMChanel(SenderDto.Id, ReceiverDto.Id);
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
                    senderId: SenderDto.Id,
                    receiverId: ReceiverDto.Id,
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
            this.DeleteFriendRelation(SenderDto.Id, ReceiverDto.Id);
            return res.status(HttpStatus.OK).send({"message": "DONE"});
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

    /*
    *  Utils : ************************************************************************************
    */

        GenerateUserDto(UserProfile) : User {
            const user : User = {
                Id: UserProfile['id'],
                Email: UserProfile['email'],
                Login: UserProfile['login'],
                UsualFullName: UserProfile['usual_full_name'],
                DefaultAvatar: `https://avatars.dicebear.com/api/croodles-neutral/${UserProfile['login']}.svg`,
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
            if (FriendshipStat === null)
                return false;
            return true;
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
