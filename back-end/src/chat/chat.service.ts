import { Body, forwardRef, HttpStatus, Inject, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, PERMISSION, RESTRICTION } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UpdateChannelDto } from 'src/dtos/Inputs.dto';

interface ManyUsers {
    userId:    number;
    channelId: string;
    permission: PERMISSION;
}

interface SocketRes {
    stat: boolean;
    payload: any;
    login: string;
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
                    {userId: SenderId, channelId: Channel.id, permission: PERMISSION.USER, restriction: RESTRICTION.NULL, duration: 0},
                    {userId: ReceiverId, channelId: Channel.id, permission: PERMISSION.USER, restriction: RESTRICTION.NULL, duration: 0}
                ]
            });
        }
    }

    async GetChannelMessages(me: number, channelId: string, @Res() res) {
        const channel = await this.GetChannelById(channelId);
        if (channel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'Channel Not Found'});
        const userChannel = await this.FindUserInChannel(me, channelId);
        if (userChannel === null)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Forbidden'});
        if (userChannel.restriction === RESTRICTION.BANNED)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Banned User'});
        let messages = await this.prisma.messages.findMany({
            where: {channelId: channelId},
            include: {sender: true},
        });
        const blackList = await this.prisma.blocks.findMany({where: {blockedId: me} });
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
        let socketRes: SocketRes = {stat: false, payload: null, login: null};
        const userStat = await this.PostMessageValidationLayer(me, channelId);

        if (userStat === USERSTAT.NOTFOUND || userStat === USERSTAT.MUTED
            || userStat === USERSTAT.BANNED || userStat === USERSTAT.BLOCKED) {
            const meDto = await this.userService.GetUserById(me);
            socketRes.stat = false;
            socketRes.login = meDto.login
            socketRes.payload =  userStat === USERSTAT.NOTFOUND ? 'User or Channel Not Found'
            : userStat === USERSTAT.BANNED ? 'Banned User'
            : userStat === USERSTAT.BLOCKED ? 'Blocked User'
            : 'Muted User'
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
        socketRes.stat = true;
        socketRes.payload = msg;
        socketRes.login = msg.sender.displayName;
        delete msg.sender;
        return socketRes;
    }

    async GetUserRestriction(me: number, user: string, channelId: string, @Res() res) {
        const userDto = await this.userService.GetUserByLogin(user);
        if (userDto === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        const meInChannel = await this.FindUserInChannel(me, channelId);
        if (meInChannel === null)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Method Not Allowed'});
        const userInChannel = await this.FindUserInChannel(userDto.id, channelId);
        if (userInChannel === null)
            return res.status().send({'message': 'User Does Not Exist In Channel'});
        if (userInChannel.restriction === RESTRICTION.MUTED) {
            let currentDt = new Date();
            if (currentDt < this.addSeconds(new Date(userInChannel.restrictionTime), userInChannel.duration)) {
                return res.status(HttpStatus.OK).send({'restriction': 'MUTED',
                                                        'permission': userInChannel.permission});
            } else {
                await this.prisma.channelsUsers.updateMany({
                    where: {
                        userId: userInChannel.userId,
                        channelId: userInChannel.channelId
                    },
                    data: {
                        restriction: RESTRICTION.NULL,
                        duration: 0
                    }
                });
                return res.status(HttpStatus.OK).send({'restriction': 'NULL',
                                                        'permission': userInChannel.permission});
            }
        }
        return res.status(HttpStatus.OK).send({'restriction': userInChannel.restriction,
                                                'permission': userInChannel.permission});
    }

    async GetManagedChannels(me: number, @Res() res) {
        let managedChannels = await this.prisma.channelsUsers.findMany({
            where: {
                userId: me,
                AND: [{
                    NOT: {restriction: RESTRICTION.BANNED},
                    OR: [
                        {permission: PERMISSION.ADMIN},
                        {permission: PERMISSION.OWNER},
                    ],
                }],
            }
        });
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
        let filtredChannels: any[] = [];

        const bannedChannels = await this.prisma.channelsUsers.findMany({
            where: {
                userId: me,
                restriction: RESTRICTION.BANNED
            }
        });
        let myChannels = await this.prisma.channels.findMany({
            where: {
                users: {some: { userId: me}}
            },
            include: {users: {include: { user: true }}},
            orderBy: {lastUpdate: 'desc'},
        });
        myChannels.forEach(element => {
            filtredChannels.push(element);
            for (let index = 0; index < bannedChannels.length; index++) {
                if (bannedChannels[index].channelId === element.id) {
                    filtredChannels.pop();
                    break;
                }
            }
        });
        await this.SetLastMessageInChannel(me, filtredChannels);
        return res.status(HttpStatus.OK).send(await this.generateChannelDto(me, filtredChannels));
    }

    async GetAllChannels(me: number, @Res() res) {
        let filtredChannels: any[] = [];

        let myChannels = await this.prisma.channels.findMany({
            where: {
                users: {some: { userId: me}}
            },
            include: {users: {include: { user: true }}},
            orderBy: {lastUpdate: 'desc'},
        });
        let allChannels = await this.prisma.channels.findMany({
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
            filtredChannels.push(element);
            for (let index = 0; index < myChannels.length; index++) {
                if (myChannels[index].id === element.id) {
                    filtredChannels.pop();
                    break;
                }
            }
        });
        return res.status(HttpStatus.OK).send(filtredChannels);  
    }

    async UpdateUserInChannel(userId: number, user: string, channelId: string, role: PERMISSION, @Res() res) {
        const meDto = await this.prisma.channelsUsers.findUnique({
            where: {
                userId_channelId: {userId, channelId},
            },
        });
        if (meDto === null || meDto.permission === PERMISSION.USER || meDto.restriction === RESTRICTION.BANNED)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'User Dont Have Permission To Update Users'});
        const userDto = await this.prisma.users.findUnique({where: { login: user}});
        if (userDto === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        const userInChannel = await this.FindUserInChannel(userDto.id, channelId);
        if (userInChannel == null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        if (((userInChannel.permission === PERMISSION.ADMIN || userInChannel.permission === PERMISSION.OWNER)
            && meDto.permission === PERMISSION.ADMIN) || userInChannel.restriction === RESTRICTION.BANNED)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'You Dont Have Rights To Update This User'});
        await this.prisma.channelsUsers.updateMany({
            where: {
                userId: userDto.id,
                channelId:channelId
            },
            data: { permission: role}
        });
        return res.status(HttpStatus.OK).send({'message': 'User Updated successfully'});
    }

    async DeleteUserFromChannel(userId: number, channelId: string, @Res() res) {
        const meDto = await this.prisma.channelsUsers.findUnique({
            where: {userId_channelId: {userId, channelId},},
        });
        if (meDto === null)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'User Not Found'});
        await this.prisma.channelsUsers.delete({
            where: {userId_channelId: {userId, channelId}}
        });
        const channelUsers = await this.prisma.channelsUsers.findMany({where: {channelId: channelId}});
        if (channelUsers.length === 0) {
            await this.prisma.messages.deleteMany({where: {channelId: channelId}});
            await this.prisma.channels.delete({where: {id: channelId}});
            return res.status(HttpStatus.OK).send({'message': 'User Removed'});
        }
        if (meDto.permission === PERMISSION.OWNER) {
            try {
                const firstAdmin = await this.prisma.channelsUsers.findFirstOrThrow({
                    where: {channelId: channelId, permission: PERMISSION.ADMIN}
                });
                await this.prisma.channelsUsers.updateMany({
                    where: {userId: firstAdmin.userId, channelId: channelId},
                    data: {permission: PERMISSION.OWNER, restriction: RESTRICTION.NULL}
                });
            } catch {
                const firstUser = await this.prisma.channelsUsers.findFirst({
                    where: {channelId: channelId, permission: PERMISSION.ADMIN}
                });
                await this.prisma.channelsUsers.updateMany({
                    where: {userId:userId, channelId: channelId},
                    data: {permission: PERMISSION.OWNER, restriction: RESTRICTION.NULL}
                });
            }
        }
        return res.status(HttpStatus.OK).send({'message': 'User Updated successfully'});
    }

    async KickUserFromChannel(me: number, user: string, channelId: string, @Res() res) {
        const userDto = await this.userService.GetUserByLogin(user);
        if(userDto === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        const userInChannel = await this.FindUserInChannel(userDto.id, channelId);
        const meInChannel = await this.FindUserInChannel(me, channelId);
        if (userInChannel === null || meInChannel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User or Channel Does Not Exist'});
        if (this.CanUpdateUserRestriction(meInChannel, userInChannel) === false)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Method Not Allowed'});
        await this.prisma.channelsUsers.deleteMany({
            where: {
                channelId: channelId,
                userId: userInChannel.userId
            }
        });
        return res.status(HttpStatus.OK).send({'message': 'User Removed Successefully'});
    }

    async UpdateChannelAccess(me: number, updateChannelDto: UpdateChannelDto, @Res() res) {
        const userInChannel = await this.FindUserInChannel(me, updateChannelDto.channelId);
        if (userInChannel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Or Channel Does Not Exist'});
        if (userInChannel.permission !== PERMISSION.OWNER)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Methode Not Allowed'});
        if (updateChannelDto.newAccessType === 'PUBLIC' ||
            updateChannelDto.newAccessType === 'PRIVATE'
            || updateChannelDto.newAccessType === 'PROTECTED')
        {
            await this.prisma.channels.update({
                where: { id: userInChannel.channelId},
                data: {
                    access: updateChannelDto.newAccessType === 'PUBLIC' ? CHANNEL.PUBLIC
                            : updateChannelDto.newAccessType === 'PRIVATE' ? CHANNEL.PRIVATE
                            : CHANNEL.PROTECTED,
                    password: updateChannelDto.newAccessType === 'PROTECTED' ? await bcrypt.hash(updateChannelDto.password, 10)
                            : null,
                }
            });
            return res.status(HttpStatus.OK).send({'message': 'Channel Updated Successefully'});
        }
        return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Access Type'});
    }

    CanUpdateUserRestriction(meInChannel: any, userInChannel: any) : boolean {
        if (meInChannel.restriction === RESTRICTION.BANNED
            || meInChannel.permission === PERMISSION.USER
            || userInChannel.permission === PERMISSION.OWNER
            || (userInChannel.permission === PERMISSION.ADMIN
                && meInChannel.permission === PERMISSION.ADMIN)
            || (userInChannel.permission === PERMISSION.OWNER
                && meInChannel.permission === PERMISSION.OWNER))
            return false;
        return true;
    }

    async ApplieBanRestriction(userInChannel: any) {
        if (userInChannel.restriction !== RESTRICTION.BANNED) {
            await this.prisma.channelsUsers.updateMany({
                where: {
                    userId: userInChannel.userId,
                    channelId: userInChannel.channelId
                },
                data: {
                    restriction: RESTRICTION.BANNED,
                    duration: 0
                }
            });
        }
    }

    async ApplieMuteRestriction(userInChannel: any, duration: number) {
        if (userInChannel.restriction !== RESTRICTION.BANNED)
            await this.prisma.channelsUsers.updateMany({
                where: {
                    userId: userInChannel.userId,
                    channelId: userInChannel.channelId
                },
                data: {
                    restriction: duration === 0 ? RESTRICTION.NULL : RESTRICTION.MUTED,
                    duration: duration
                }
            });
    }

    async ApplieUnbanRestriction(userInChannel: any) {
        if (userInChannel.restriction === RESTRICTION.BANNED)
            await this.prisma.channelsUsers.updateMany({
                where: {
                    userId: userInChannel.userId,
                    channelId: userInChannel.channelId
                },
                data: {
                    restriction: RESTRICTION.NULL,
                    duration: 0
                }
            });
    }

    async UpdateUserRestrictionInChannel(userId: number, user: string, channelId: string,
        restriction: RESTRICTION, duration: number, @Res() res)
    {
        const meInChannel = await this.FindUserInChannel(userId, channelId);
        const userDto = await this.userService.GetUserByLogin(user);
        if (userDto === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        const userInChannel = await this.FindUserInChannel(userDto.id, channelId);
        if (meInChannel === null || userInChannel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Or Channel Does Not Exist'});
        if (this.CanUpdateUserRestriction(meInChannel, userInChannel) === false)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Method Not Allowed'});
        if (restriction === RESTRICTION.BANNED)
            this.ApplieBanRestriction(userInChannel);
        else if (restriction === RESTRICTION.MUTED)
            this.ApplieMuteRestriction(userInChannel, duration);
        else if (restriction === RESTRICTION.NULL)
            this.ApplieUnbanRestriction(userInChannel);
        return res.status(HttpStatus.OK).send({'message': 'User Successefully Updated'});
    }

    async JoinProtectedChannel(userProfile: any, channel: any, password: string, @Res() res) {
        if (password === null || password === undefined)
            return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Password Required'});
        if (await bcrypt.compare(password, channel.password) === true) {
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

    async JoinChannel(me: number, channelId: string, password: string, @Res() res) {
        const channel = await this.GetChannelById(channelId);
        if (channel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'Channel Not Found'});
        const userProfile = await this.userService.GetUserById(me);
        if (userProfile === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
        const userInChannel = await this.FindUserInChannel(me, channelId);
        if (userInChannel !== null || channel.access === CHANNEL.DM)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'User Is Not Allowed To Join This Channel'});
        if (channel.access === CHANNEL.PROTECTED)
            return this.JoinProtectedChannel(userProfile, channel, password, res);
        await this.prisma.channelsUsers.create({
            data: {
                userId: userProfile.id,
                channelId: channel.id,
                permission: PERMISSION.USER,
            }
        });
        return res.status(HttpStatus.OK).send({'message': 'User Added'});
    }

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
        if (password !== null &&  password !== undefined) {
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
        let userDto = await this.prisma.users.findUnique({where:{id: me}});
        userDto.achievement[0] = true;
        await this.prisma.users.update({
            where: {id: me},
            data: {achievement: userDto.achievement},
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

    async GetChannelById(channelId: string) {
        if (channelId === null || channelId === undefined)
            return null;
        return await this.prisma.channels.findUnique({where: {id: channelId} });
    }

    async FindUserInChannel(userId: number, channelId: string) {
        let userChannel = await this.prisma.channelsUsers.findUnique({
            where: { userId_channelId: {userId, channelId}} });
        return userChannel;
    }

    async MutedUser() {

    }

    addSeconds(date, seconds) {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }

    async PostMessageValidationLayer(me: number, channelId: string) : Promise<USERSTAT> {
        const channel = await this.GetChannelById(channelId);
        if (channel === null)
            return USERSTAT.NOTFOUND;
        const userInChannel = await this.FindUserInChannel(me, channelId);
        if (userInChannel === null)
            return USERSTAT.NOTFOUND;
        if (channel.access === CHANNEL.DM) {
            const dmChannel = await this.prisma.channelsUsers.findMany({where: {channelId: channelId}});
            if (await this.userService.IsBlockedUser(dmChannel[1].userId, dmChannel[0].userId)
                || await this.userService.IsBlockedUser(dmChannel[0].userId, dmChannel[1].userId)) {
                    return USERSTAT.BLOCKED;
            }
        }
        else if (userInChannel.restriction === RESTRICTION.BANNED)
            return USERSTAT.BANNED;
        else if (userInChannel.restriction === RESTRICTION.MUTED) {
            let currentDt = new Date();
            if (currentDt < this.addSeconds(new Date(userInChannel.restrictionTime), userInChannel.duration)) {
                return USERSTAT.MUTED
            } else {
                await this.prisma.channelsUsers.updateMany({
                    where: {
                        userId: userInChannel.userId,
                        channelId: userInChannel.channelId
                    },
                    data: {
                        restriction: RESTRICTION.NULL,
                        duration: 0
                    }
                });
            }
        }
        return USERSTAT.ACCESS;
    }
}
