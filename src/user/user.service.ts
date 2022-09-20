import { HttpCode, HttpStatus, Injectable, Query, Req, Res } from '@nestjs/common';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async SendFriendRequest(User1Id: number, User2Id: number, @Res() res) {
        if (User1Id === User2Id)
            return res.status(HttpStatus.FORBIDDEN).send({ "message": 'Wach Nta 7maaaaar'});
            let FriendsStat = await this.prisma.friends.findMany({
            where: {
                SenderId: User1Id,
                ReceiverId: User2Id,
            } || {
                SenderId: User2Id,
                ReceiverId: User1Id,
            },
        });
        console.log("__FRIENDS__STAT__ : ", FriendsStat);
        if (FriendsStat.length === 0) {
            const user = await this.prisma.friends.create({
                data: {
                    SenderId: User1Id,
                    ReceiverId: User2Id,
                    Status: "Pending",
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
                Id: UserProfile.Id,
                Email: UserProfile.Email,
                Login: UserProfile.Login,
                UsualFullName: UserProfile.UsualFullName,
                DefaultAvatar: UserProfile.DefaultAvatar,
                UploadedAvatar: UserProfile.UploadedAvatar,
                Status: UserProfile.Status,
                Notifications: UserProfile.Notifications,
                Wins: UserProfile.Wins,
                Losses: UserProfile.Losses,
                Level: UserProfile.Level,
                TwoFactorAuth: false,
            },
        });
    }

    async GetRequests(UserId: number, @Res() res) {
        let requests = await this.prisma.friends.findMany({
            where: {
                ReceiverId: UserId,
                Status: "Pending",
            }
        });
        console.log("__PENDING__REQUESTS__ : ", requests);
        return res.send(requests);
    }

    async    GetUserById(Id: number) : Promise<any> {
        let user = await this.prisma.users.findUnique({
            where: {
                Id: Id,
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
                    UserId: UserDto.Id,
                    BlockedId: BlockedUserDto.Id,
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
                    UserId: UserDto.Id,
                    BlockedId: BlockedUserDto.Id,
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
                    ReceiverId: ReceiverDto.Id,
                    SenderId: SenderDto.Id,
                    Status: "Pending",
                },
                data: {
                    Status: "Friends",
                }
            });
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
                    SenderId: SenderDto.Id,
                    ReceiverId: ReceiverDto.Id,
                    Status: "Pending"
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
                    Login: username,
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
                    UserId: User,
                    BlockedId: BlockedUserId,
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
                        SenderId: Receiver,
                        ReceiverId: Sender
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
                    SenderId: User1,
                    ReceiverId: User2,
                }
            });
            const Delete1 = await this.prisma.friends.deleteMany({
                where: {
                    SenderId: User2,
                    ReceiverId: User1,
                }
            });
        }
}
