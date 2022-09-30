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
        members: number[], password: string, channelIcone: string, @Res() res) {
        let channel = await this.prisma.channels.create({ 
            data: {
                access: CHANNEL[type],
                name: channelName,
                picture: channelIcone,
                password: password
            }
        });
        
        let owner = await this.prisma.channelsUsers.create({
            data: {userId: me, channelId: channel.id, permission: PERMISSION.OWNER}
        });

        let manyUsers : ManyUsers[];
        members.forEach(element => {
            manyUsers.push({userId: element, channelId: channel.id, permission: PERMISSION.USER});
        });
        let addedUseres = await this.prisma.channelsUsers.createMany({
            data: manyUsers,
        });
        return res.status(HttpStatus.CREATED).send({'message': "Channel Created Successfully"});
    }
}
