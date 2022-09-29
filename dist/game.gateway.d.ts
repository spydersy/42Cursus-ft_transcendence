import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class CatsController {
    findAll(): string;
}
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    private logger;
    private roomslenght;
    private roomArray;
    afterInit(server: any): void;
    playerExist(client: any, login: string): boolean;
    JoinPlayer(client: any, login: string): void;
    RemovePlayer(client: any, id: string): void;
    AddtoRoomArray(client: any, login: string): void;
    handleDisconnect(client: any): void;
    handleConnection(client: any, payload: any): void;
    playerConnect(client: any, payload: any): void;
}
