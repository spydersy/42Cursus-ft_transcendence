import { Body, forwardRef, HttpStatus, Inject, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, PERMISSION, RESCTRICTION } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

interface ManyUsers {
    userId:    number;
    channelId: string;
    permission: PERMISSION;
}

interface SocketRes {
    stat: boolean;
    payload: any;
}

enum USERSTAT{
    MUTED,
    ACCESS,
    BANNED,
    BLOCKED,
    NOTFOUND
}

export interface userInChannel {
    permission:      string,
    restriction:     string,
    restrictionTime: string,
    duration:        number,
    login:           string,
    displayName:     string,
    defaultAvatar:   string,
}

export interface myChannelsDto {
    channelId:   number,
    access:      CHANNEL,
    name:        string,
    picture:     string,
    password:    string,
    nbMessages:  number,
    lastUpdate:  Date,
    lastMessage: string,
    users:       userInChannel[],
}

@Injectable()
export class ChatService {
    constructor(@Inject(forwardRef(() => UserService))
                private userService: UserService,
                private prisma: PrismaService) {}

    async CreatDMChannel(SenderId: number, ReceiverId: number) {
        let DMChannel = await this.prisma.channels.findMany({
            where :
            {
                AND: [
                    {access: CHANNEL.DM},
                    { users: { some: {userId: SenderId}}},
                    { users: { some: {userId: ReceiverId}}}
                ],
            }
        });
        if (DMChannel.length === 0) {
            let Channel = await this.prisma.channels.create({
                data: { access: CHANNEL.DM, }
            });
            let Users = await this.prisma.channelsUsers.createMany({
                data: [
                    {userId: SenderId, channelId: Channel.id, permission: PERMISSION.USER, restriction: RESCTRICTION.NULL, duration: 0},
                    {userId: ReceiverId, channelId: Channel.id, permission: PERMISSION.USER, restriction: RESCTRICTION.NULL, duration: 0}
                ]
            });
            console.log("__DM__USERS__DBG__ : ", Users);
        }
        console.log("__DM__CHANNEL__DBG__ : ", DMChannel);
    }

    async GetChannelMessages(me: number, channelId: string, @Res() res) {
        // Find Channel
        const channel = await this.GetChannelById(channelId);
        if (channel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'Channel Not Found'});
        // Find User In Channel
        const userChannel = await this.FindUserInChannel(me, channelId);
        if (userChannel === null)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Forbidden'});
        // Check Banned User
        if (userChannel.restriction === RESCTRICTION.BANNED)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Banned User'});
        // Get All Messages
        let messages = await this.prisma.messages.findMany({
            where: {channelId: channelId},
            include: {sender: true},
        });
        // Get Blocked Users
        const blackList = await this.prisma.blocks.findMany({where: {blockedId: me} });
        // Filter Messages
        messages.forEach(message => {
            message['displayName'] = message.sender.displayName;
            for (let index = 0; index < blackList.length; index++) {
                if (message.sender.id === blackList[0].userId) {
                    message.content = "Hidden Content 👻👻👻";
                    break ;
                }
            }
            delete message.sender;
        });
        res.status(HttpStatus.OK).send(messages);
    }

    async SendMessage(me: number, messageContent: string, channelId: string) {
        let socketRes: SocketRes = {stat: false, payload: null};
        const userStat = await this.PostMessageValidationLayer(me, channelId);

        if (userStat === USERSTAT.NOTFOUND || userStat === USERSTAT.MUTED
            || userStat === USERSTAT.BANNED || userStat === USERSTAT.BLOCKED) {
            socketRes.stat = false;
            socketRes.payload =  userStat === USERSTAT.NOTFOUND ? 'User or Channel Not Found'
            : userStat === USERSTAT.BANNED ? 'Banned User'
            : userStat === USERSTAT.BLOCKED ? 'Blocked User'
            : 'Muted User'
            console.log("__ENDPOINT__00__");
            return socketRes;
        }
        let msg = await this.prisma.messages.create({
            data: {
                senderId: me,
                channelId: channelId,
                content: messageContent,
            },
            include: {
                sender : true,
            }
        });
        await this.prisma.channels.update({
            where: {id: channelId},
            data: {nbMessages: {increment: 1}},
        });
        msg['displayName'] = msg.sender.displayName;
        delete msg.sender;
        socketRes.stat = true;
        socketRes.payload = msg;
        console.log("__ENDPOINT__01__");
        return socketRes;
    }

    async GetManagedChannels(me: number, @Res() res) {
        let managedChannels = await this.prisma.channelsUsers.findMany({
            where: {
                userId: me,
                OR: [
                    {permission: PERMISSION.ADMIN},
                    {permission: PERMISSION.OWNER},
                ],
            }
        });
        console.log("__MANAGED__CHANNELS__DBG__ : ", managedChannels);
        return res.send(managedChannels);
    }

    async SetLastMessageInChannel(me: number, myChannels : any[]) {
        const blackList = await this.prisma.blocks.findMany({
            where: {blockedId: me}
        });
        for (let index = 0; index < myChannels.length; index++) {
            let lastMessage = await this.prisma.messages.findMany({
                where: { channelId: myChannels[index].id},
                orderBy: { date: 'desc'},
                take: 1,
            });
            myChannels[index]['lastMessage'] = "";
            if (lastMessage.length === 1) {
                myChannels[index]['lastMessage'] = lastMessage[0].content;
                for (let index = 0; index < blackList.length; index++) {
                    if (blackList[index]['userId'] === lastMessage[0].senderId) {
                        myChannels[index]['lastMessage'] = "Hidden Content 👻👻👻";
                        break ;
                    }
                }
            }
            delete myChannels[index]['password'];
        }
        return myChannels;
    }

    async GetMyChannels(me: number, @Res() res) {
        let myChannels = await this.prisma.channels.findMany({
            where: {
                users: {some: { userId: me}}
            },
            include: {users: {include: { user: true }}},
            orderBy: {lastUpdate: 'desc'},
        });
        await this.SetLastMessageInChannel(me, myChannels);
        return res.status(HttpStatus.OK).send(await this.generateChannelDto(me, myChannels));
    }

    async GetAllChannels(@Res() res) {
        const allChannels = await this.prisma.channels.findMany({
            where: {
                OR: [
                    {access: CHANNEL.PUBLIC},
                     {access: CHANNEL.PROTECTED}
                ],
            },
            include: { users: true}
        });
        allChannels.forEach(element => {
            element['nbUsers'] = element.users.length;
            delete element.users;
            delete element.password;
        });
        console.log("__ALL__CHANNELS__ENDPOINT__DBG__ : ", allChannels);
        return res.status(HttpStatus.OK).send(allChannels);
    }

    async UpdateUserInChannel(me: number, user: string, channelId: string, role: PERMISSION, @Res() res) {
        if (await this.CanUpdateChannel(me, channelId) === true) {
            const channel = await this.prisma.channels.findUnique({where: {id: channelId} });
            if (channel === null || channel.access === CHANNEL.DM)
               return res.status(HttpStatus.FORBIDDEN).send({'message': 'Cant Add User'});
            const userProfile = await this.userService.GetUserByLogin(user);
            if (userProfile === null)
                return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
            console.log(userProfile.id);
            await this.prisma.channelsUsers.update({
                where: {
                    userId_channelId: {
                        userId: userProfile.id,
                        channelId: channel.id
                    },
                },
                data: { permission: role}
            });
            return res.status(HttpStatus.OK).send({'message': 'User Updated'});
        }
        return res.status(HttpStatus.FORBIDDEN).send({'message': 'Method Not Allowed'});
    }

    async DeleteUserFromChannel(me: number, user: string, channelId: string, @Res() res) {
        const channel = await this.prisma.channels.findUnique({where: {id: channelId} });
        if (channel === null || channel.access === CHANNEL.DM)
           return res.status(HttpStatus.FORBIDDEN).send({'message': 'Cant Add User'});
        const userProfile = await this.userService.GetUserByLogin(user);
        if (userProfile === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        if ((userProfile.id === me)
        || (userProfile.id !== me && await this.CanUpdateChannel(me, channelId) === true)) {
            try {
                await this.prisma.channelsUsers.delete({
                    where: {
                        userId_channelId: {userId: userProfile.id, channelId: channelId}
                    }
                });
                res.status(HttpStatus.OK).send({'message': 'User Deleted'});
            } catch {
                res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
            }
        }
        res.status(HttpStatus.FORBIDDEN).send({'message': 'Forbidden'});
    }

    async UpdateUserRestrictionInChannel(me: number, user: string, channel: string,
        restriction: string, duration: number, @Res() res) {

    }

    async JoinChannel(me: number, user: string, channelId: string, password: string, @Res() res) {
        // Find Channel:
        const channel = await this.GetChannelById(channelId);
        if (channel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'Channel Not Found'});
        // Find User:
        const userProfile = await this.userService.GetUserById(me);
        if (userProfile === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        // Find User In Channel:
        const userInChannel = await this.FindUserInChannel(me, channelId);
        if (userInChannel !== null || channel.access === CHANNEL.PRIVATE
            || channel.access === CHANNEL.DM)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'User Is Not Allowed To Join This Channel'});
        if (channel.access === CHANNEL.PROTECTED) {
            if (password === null || password === undefined)
                return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Password Required'});
            if (channel.password === password) {
                await this.prisma.channelsUsers.create({
                    data: {
                        userId: userProfile.id,
                        channelId: channel.id,
                        permission: PERMISSION.USER,
                    }
                });
                return res.status(HttpStatus.CREATED).send({'message': 'User Added'});
            }
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Wrong Password'});
        }
        await this.prisma.channelsUsers.create({
            data: {
                userId: userProfile.id,
                channelId: channel.id,
                permission: PERMISSION.USER,
            }
        });
        return res.status(HttpStatus.OK).send({'message': 'User Added'});
    }

    // async AddUserToChannel(me: number, user: string, channelId: string, password: string, @Res() res) {
    //     // Find Channe:
    //     if (await this.CanUpdateChannel(me, channelId) === true) {
    //         const channel = await this.prisma.channels.findUnique({
    //             where: {id: channelId},
    //         });
    //         if (channel === null || channel.access === CHANNEL.DM)
    //             return res.status(HttpStatus.FORBIDDEN).send({'message': 'Cant Add User'});
    //     // Find User:
    //         const userProfile = await this.userService.GetUserByLogin(user);
    //         if (userProfile === null)
    //                 return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
    //     // Find User In Channel:
    //         const userInChannel = await this.FindUserInChannel(userProfile.id, channel.id);
    //         if (userInChannel !== null)
    //             return res.status(HttpStatus.FORBIDDEN).send({'message': 'User Already Exist In Channel'});

    //         try {
    //             await this.prisma.channelsUsers.create({
    //             data: {
    //                 userId: userProfile.id ,
    //                 channelId: channelId,
    //                 permission: PERMISSION.USER
    //             }
    //             });
    //             return res.status(HttpStatus.CREATED).send({'message': 'User Added Succesefully'});
    //         } catch {
    //             return res.status(HttpStatus.CONFLICT).send({'message': 'User Already Exist'});
    //         }
    //     }
    //     return res.status(HttpStatus.FORBIDDEN).send({'message': 'Method Not Allowed'});
    // }

    async CreateRoom(me: number, channelName: string, type: string,
        members: string[], password: string, channelIcone: string, @Res() res) {
        let access = null;
        if (type === 'private')
            access = CHANNEL.PRIVATE
        else if (type === 'public')
            access = CHANNEL.PUBLIC
        else if (type === 'protected')
            access = CHANNEL.PROTECTED
        else
            return res.status(HttpStatus.BAD_REQUEST).send({'messaeg': 'Wrong channel type'});
        if (password !== null) {
            const saltOrRounds = 10;
            password = await bcrypt.hash(password, saltOrRounds);
        }
        let channel = await this.prisma.channels.create({
            data: {
                access: access,
                name: channelName,
                picture: channelIcone,
                password: password
            }
        });

        await this.prisma.channelsUsers.create({
            data: {userId: me, channelId: channel.id, permission: PERMISSION.OWNER}
        });
        if (members.length !== 0) {
            let manyUsers : ManyUsers[];
            manyUsers = [];
            members.forEach(element => {
                manyUsers.push({userId: parseInt(element, 10), channelId: channel.id, permission: PERMISSION.USER});
            });
            let addedUseres = await this.prisma.channelsUsers.createMany({
                data: manyUsers,
            });
        }
        return res.status(HttpStatus.CREATED).send({'message': "Channel Created Successfully"});
    }

    /* Helper Functions : ************************************************************************ */
    async generateChannelDto(me: number, channels: any) : Promise<myChannelsDto[]> {
        let myChannels: myChannelsDto[] = [];


        channels.forEach(chnl => {

            let Channel: myChannelsDto = {
                channelId:  chnl.id,
                access:     chnl.access,
                name:       chnl.name,
                picture:    chnl.picture,
                password:   chnl.password,
                nbMessages: chnl.nbMessages,
                lastUpdate: chnl.lastUpdate,
                lastMessage: chnl.lastMessage,
                users:      [],
            };
            chnl.users.forEach(user => {
                let userdto: userInChannel = {
                    permission: user.permission,
                    restriction: user.restriction,
                    restrictionTime: user.restrictionTime,
                    duration: user.duration,
                    login: user.user.login,
                    displayName: user.user.displayName,
                    defaultAvatar: user.user.defaultAvatar,
                };
                if (user.user.id === me)
                    Channel.users.splice(0, 0, userdto);
                else
                    Channel.users.push(userdto);
            });
            myChannels.push(Channel);
        });
        return myChannels;
    }

    async CanUpdateChannel(userId: number, channelId: string) : Promise<boolean> {
        const userChannelPair = await this.prisma.channelsUsers.findUnique({
            where: {
                userId_channelId: {userId, channelId},
            },
        });
        if (userChannelPair === null
        || userChannelPair.permission === PERMISSION.USER)
            return false;
        return true;
    }

    async GetChannelById(channelId: string) {
        return await this.prisma.channels.findUnique({where: {id: channelId} });
    }

    async FindUserInChannel(userId: number, channelId: string) {
        let userChannel = await this.prisma.channelsUsers.findUnique({
            where: { userId_channelId: {userId, channelId}} });
        return userChannel;
    }

    async MutedUser() {

    }

    async PostMessageValidationLayer(me: number, channelId: string) : Promise<USERSTAT> {
        const channel = await this.GetChannelById(channelId);
        const userInChannel = await this.FindUserInChannel(me, channelId);

        if (channel === null)
            return USERSTAT.NOTFOUND;
        else if (channel.access === CHANNEL.DM) {
            const dmChannel = await this.prisma.channelsUsers.findMany({where: {channelId: channelId}});
            if (await this.userService.IsBlockedUser(dmChannel[0].userId === me
                ? dmChannel[1].userId : dmChannel[0].userId, me)) {
                    console.log("__BLOCKED__USER__BEF__SEND__MESSAGE__");
                    return USERSTAT.BLOCKED;
            }
        }
        else if (userInChannel === null)
            return USERSTAT.NOTFOUND;
        else if (userInChannel.restriction === RESCTRICTION.BANNED)
            return USERSTAT.BANNED;
        else if (userInChannel.restriction === RESCTRICTION.MUTED) {

        }
        return USERSTAT.ACCESS;
    }
}
