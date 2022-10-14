import { Body, forwardRef, HttpStatus, Inject, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, PERMISSION, RESCTRICTION } from '@prisma/client';
import { UserService } from 'src/user/user.service';

interface ManyUsers {
    userId:    number;
    channelId: string;
    permission: PERMISSION;
}

enum USERSTAT{
    MUTED,
    ACCESS,
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
    channelId:  number,
    access:     CHANNEL,
    name:       string,
    picture:    string,
    password:   string,
    nbMessages: number,
    lastUpdate: Date,
    users:      userInChannel[],
}

@Injectable()
export class ChatService {
    constructor(@Inject(forwardRef(() => UserService))
                private userService: UserService,
                private prisma: PrismaService) {}

    // DONE
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
    // All validations needed:
        // 1) Is a public/private/protected/dm channel ?
        let channel = await this.GetChannelById(channelId);
        if (channel === null)
            return res.status(HttpStatus.NOT_FOUND).send({'message': 'Channel Not Found'});
        // 2) user exist in this channel ?
        let userChannel = await this.FindUserInChannel(me, channelId);
        if (userChannel === null)
            return res.status(HttpStatus.FORBIDDEN).send({'message': 'Forbidden'});
        // 3) user have rights to get content ?
        if (userChannel.restriction === RESCTRICTION.BANNED
        || userChannel.restriction === RESCTRICTION.MUTED) {
            let now = new Date();
            let restrictionTime = new Date();
            // console.log("__DIFF__ : ", restrictionTime - now);
            // if ()
        }
        let messages = await this.prisma.messages.findMany({
            where: {channelId: channelId},
            include: {sender: true},
        });
        messages.forEach(message => {
            message['displayName'] = message.sender.displayName;
            delete message.sender;
        });
        console.log("__MESSAGES__DGB__ : ", messages);
        res.status(HttpStatus.OK).send(messages);
    }

    async SendMessage(me: number, messageContent: string, channelId: string) {
        if (await this.PostMessageValidationLayer(me, messageContent, channelId) === USERSTAT.ACCESS) {
            await this.prisma.messages.create({
                data: {
                    senderId: me,
                    channelId: channelId,
                    content: messageContent,
                }
            });
            await this.prisma.channels.update({
                where: {id: channelId},
                data: {nbMessages: {increment: 1}},
            });
            // return res
            // .status(HttpStatus.CREATED)
            // .send({'message': "Message Sent"});
        }
        // return res.status(HttpStatus.FORBIDDEN).send({'message': "Method Not Allowed"});
    }

    async GetMyChannels(me: number, @Res() res) {
        let allChannels = await this.prisma.channels.findMany({
            where: {
                users: {some: { userId: me}}
            },
            include: {users: {include: { user: true }}},
            orderBy: {lastUpdate: 'desc'},
        });
        return res.status(HttpStatus.OK).send(await this.generateChannelDto(me, allChannels));
    }

    async AddUserToChannel(me: number, user: string, channelId: string, @Res() res) {
        if (await this.CanUpdateChannel(me, channelId) === true) {
            const channel = await this.prisma.channels.findUnique({
                where: {id: channelId},
            });
            if (channel === null || channel.access === CHANNEL.DM)
               return res.status(HttpStatus.FORBIDDEN).send({'message': 'Cant Add User'});
               const userProfile = await this.userService.GetUserByLogin(user);
               if (userProfile === null) {
                    return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
               }
            try {
               await this.prisma.channelsUsers.create({
                    data: {
                        userId: userProfile.id ,
                        channelId: channelId,
                        permission: PERMISSION.USER
                    }
                });
            } catch {
                return res.status(HttpStatus.CONFLICT).send({'message': 'User Already Exist'});
            }
        }
        return res.status(HttpStatus.FORBIDDEN).send({'message': 'Method Not Allowed'});
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
            console.log("__members__ : ", members);
            let manyUsers : ManyUsers[];
            manyUsers = [];
            console.log("__many__members__00__ : ", manyUsers);
            members.forEach(element => {
                manyUsers.push({userId: parseInt(element, 10), channelId: channel.id, permission: PERMISSION.USER});
            });
            console.log("__MANY__members__ : ", manyUsers);
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
        let channel = await this.prisma.channels.findUnique({
            where: {id: channelId}
        });
        return channel;
    }

    async FindUserInChannel(userId: number, channelId: string) {
        let userChannel = await this.prisma.channelsUsers.findUnique({
            where: {
                userId_channelId: {userId, channelId},
            },
        });
        return userChannel;
    }

    async PostMessageValidationLayer(me: number, messageContent: string, channelId: string) : Promise<USERSTAT> {
        // All Cases:
            // 1) This user exist in this channel ?
            const userInChannel = await this.FindUserInChannel(me, channelId);
            if (userInChannel === null)
                return USERSTAT.NOTFOUND;
            // 2) The User have the right to send message (Banned/Muted) ?
            // if ()
            // 3)

        // return true;
    }

    async GetMessageValidationLayer(me: number, messageContent: string, channelId: string) {
        // Do Something . . .
        return true;
    }
}
