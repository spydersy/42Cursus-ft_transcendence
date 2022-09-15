import { HttpStatus, Injectable, Query, Req, Res } from '@nestjs/common';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}



    async SendFriendRequest(User1Id: number, User2Id: number) {
        if (User1Id === User2Id) {
            return {"statusCode": 403, "message": 'Cant Add Yourself As Friend'};
        }
        let FriendsStat = await this.prisma.friends.findFirst({
            where: {
                User1: User1Id,
                User2: User2Id,
            } && {
                User1: User2Id,
                User2: User1Id,
            },
        });
        console.log("__FRIENDS__STAT__ : ", FriendsStat);
        if (FriendsStat === null) {
            const user = await this.prisma.friends.create({
                data: {
                    User1: User1Id,
                    User2: User2Id,
                    Status: "Pending",
                },
            });
            return {"statusCode":200, "message": 'Friend Request Sent', 'status': 'Pending'};
        }
        else if (FriendsStat.Status === 'Pending') {
            return {"statusCode":200, "message": `Friend Request Already Sent`, "status": 'Pending'};
        }
        else if (FriendsStat.Status === 'Friends') {
            return {"statusCode":200, "message": `Already Friends`, "status": 'friends'};
        }
    }

    async AddFriend(user1: string, user2: string) {
        let User1Dto = await this.GetUserByLogin(user1);
        let User2Dto = await this.GetUserByLogin(user2);

        if (User2Dto === null) {
            return {"statusCode":404, "message": `${user2} does not exist`, "error":"Not Found"};
        }
        else if (await this.IsBlockedUser(User2Dto.Id, User1Dto.Id) === true) {
            return {"statusCode":403, "message": `${user2} blocked ${user1} does not exist`, "error":"Forbidden"};
        }
        return await this.SendFriendRequest(User1Dto.Id, User2Dto.Id);
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

    // async   UpdateLogin(userJWT, @Query() query) {
    //     try {
    //         const updateUser = await this.prisma.users.update({
    //             where: {
    //                 Id: userJWT.userId,
    //             },
    //             data: {
    //                 Login: "hkhalil",
    //             },
    //         });
    //         console.log("__UPDATED__USER__ : ",  updateUser);
    //         return {"statusCode":200,
    //                 "message": "UserName Updated Successfully!"
    //             };
    //     }
    //     catch {
    //         return {"statusCode":405,
    //                 "message": "UserName Already Exist!"
    //             };
    //     }
    // }

    async GetRequests(UserId: number, @Res() res) {
        let requests = await this.prisma.friends.findMany({
            where: {
                User2: UserId,
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
        async BlockUser(username1: string, username2: string, @Res() res) {
            let User1Dto = await this.GetUserByLogin(username1);
            let User2Dto = await this.GetUserByLogin(username2);
            
            console.log(`${username1} Want To Block ${username2}`);
            if (await this.IsBlockedUser(User1Dto.Id, User2Dto.Id) === true)
                return res.status(HttpStatus.OK).send({"message": `${username1} Blocked ${username2}`});
            if (await this.IsBlockedUser(User2Dto.Id, User1Dto.Id) === true)
                return res.status(HttpStatus.FORBIDDEN).send({"message": `${username2} Already Blocked ${username1}`});
            const user = await this.prisma.blocks.create({
                data: {
                    User1: User1Dto.Id,
                    User2: User2Dto.Id,
                },
            });
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

        async IsBlockedUser(User1Id : number, User2Id : number) {
            let BlockStat = await this.prisma.blocks.findFirst({
                where: {
                    User1: User1Id,
                    User2: User2Id,
                },
            });
            if (BlockStat === null)
                return false;
            return true;
        }
}
