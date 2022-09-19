import { HttpCode, HttpStatus, Injectable, Query, Req, Res } from '@nestjs/common';
import { Relation } from '@prisma/client';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async SendFriendRequest(User1Id: number, User2Id: number, @Res() res) {
        if (User1Id === User2Id)
            return res.status(HttpStatus.FORBIDDEN).send({ "message": 'Wach Nta 7maaaaar'});
            let FriendsStat = await this.prisma.userRelations.findMany({
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
            const user = await this.prisma.userRelations.create({
                data: {
                    senderId: User1Id,
                    receiverId: User2Id,
                    status: Relation.PENDING,
                },
            });
            return res.status(HttpStatus.OK).send({ "message": 'DONE00'});
        }
        else
            return res.status(HttpStatus.OK).send({ "message": 'RELATION ALREADY EXIST'});
    }

    async AddUserToDB(UserProfile : User) {
        const user = await this.prisma.user.create({
            data: {
                id: UserProfile.Id,
                login: UserProfile.Login,
                displayName: UserProfile.UsualFullName,
                defaultAvatar: UserProfile.DefaultAvatar,
                uploadedAvatar: UserProfile.UploadedAvatar,
                Notifications: UserProfile.Notifications,
                wins: UserProfile.Wins,
                losses: UserProfile.Losses,
                level: UserProfile.Level,
                twoFactorAuth: false,
            },
        });
    }

    async GetRequests(UserId: number, @Res() res) {
        let requests = await this.prisma.userRelations.findMany({
            where: {
                receiverId: UserId,
                status: Relation.PENDING,
            }
        });
        console.log("__PENDING__REQUESTS__ : ", requests);
        return res.send(requests);
    }

    async    GetUserById(Id: number) : Promise<any> {
        let user = await this.prisma.user.findUnique({
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
                    UserId: UserDto.Id,
                    BlockedId: BlockedUserDto.Id,
                },
            });
            this.DeleteFriend(UserDto.Id, BlockedUserDto.Id);
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

            if (ReceiverDto === null || SenderDto === null) // DONE =====================================
                return res.status(HttpStatus.BAD_REQUEST).send({"message": "User Not Found"}); //      ||
            // ==========================================================================================

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
            this.DeleteFriend(SenderDto.Id, ReceiverDto.Id);
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

        async FindUsersRelation(User1: number, User2: number) : Promise<number> {
            let RelationStat = await this.prisma.userRelations.findMany({
                where: {
                    senderId: User1,
                    receiverId: User2,
                } || {
                    senderId: User2,
                    receiverId: User1,
                },
            });
            return RelationStat.length;
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
            let BlockStat = await this.prisma.userRelations.findMany({
                where: {
                    senderId: User,
                    receiverId: BlockedUserId,
                } || ,
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

        async DeleteFriend(User1: number, User2: number){
            console.log(User1, User2);
            const Delete = await this.prisma.friends.deleteMany({
                where: {
                    SenderId: User1,
                    ReceiverId: User2,
                } || {
                    SenderId: User2,
                    ReceiverId: User1,
                }
            });
            console.log("__DELETE__FRIEND__ : ", Delete);
        }
}
