import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    private logger;
    private roomlenght;
    afterInit(server: any): void;
    handleDisconnect(client: any): void;
    handleConnection(client: any, payload: any): void;
    handleJoinRoom(client: any, room: string): void;
}
