import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, PERMISSION, Prisma, RESCTRICTION } from '@prisma/client';


interface ManyUsers {
    userId:    number;
    channelId: number;
    permission: PERMISSION;
}

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}


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
}
