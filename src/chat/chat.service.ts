import { Body, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, PERMISSION, RESCTRICTION } from '@prisma/client';
import internal from 'stream';

interface ManyUsers {
    userId:    number;
    channelId: string;
    permission: PERMISSION;
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
    constructor(private prisma: PrismaService) {}

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

    async PostMessageValidationLayer(me: number, messageContent: string, channelId: string) : Promise<boolean> {
        // All Cases:
            // 1) This user exist in this channel ?
            // 2) The User have the right to send message (Banned/Muted) ?
            // 3)

        return true;
    }

    async GetMessageValidationLayer(me: number, messageContent: string, channelId: string) : Promise<boolean> {
        // Do Something . . .
        return true;
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
            where: {senderId: me, channelId: channelId}
        });
        res.status(HttpStatus.OK).send(messages);
    }

    async SendMessage(me: number, @Body() messageData, @Res() res) {
        let messageContent: string = messageData['content'];
        let channelId: string = messageData['channelId'];
        if (await this.PostMessageValidationLayer(me, messageContent, channelId) === true) {
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
            return res
            .status(HttpStatus.CREATED)
            .send({'message': "Message Sent"});
        }
        return res.status(HttpStatus.FORBIDDEN).send({'message': "Method Not Allowed"});
    }

    async GetMyRooms(me: number, @Res() res) {
        let allChannels = await this.prisma.channels.findMany({
            where: {
                users: {some: { userId: me}}
            },
            include: {users: {include: { user: true }}},
            orderBy: {lastUpdate: 'desc'},
        });
        return res.status(HttpStatus.OK).send(await this.generateChannelDto(me, allChannels));
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

}
