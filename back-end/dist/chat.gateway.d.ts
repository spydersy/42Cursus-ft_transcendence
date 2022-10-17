import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    private logger;
    handleMessage(client: Socket, payload: any): Promise<void>;
    handleJoinRoom(client: Socket, room: string): void;
    handleLeftRoom(client: Socket, room: string): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
