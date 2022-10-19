import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { PrismaService } from './prisma/prisma.service';
export declare class OnlineLogerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    private prisma;
    constructor(chatService: ChatService, prisma: PrismaService);
    server: Server;
    private logger;
    handleMessage(client: Socket, payload: any): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: any): Promise<void>;
    handleConnection(client: Socket, ...args: any[]): void;
}
