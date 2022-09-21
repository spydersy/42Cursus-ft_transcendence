import { Injectable } from '@nestjs/common';
import { CHANNEL } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    async CreatDMChanel(User1: number, User2: number) {
        this.prisma.channels.findMany({
            where: {
                access: CHANNEL.DM,
            },
            include: {
                users: true
            }
        });
    }
}
