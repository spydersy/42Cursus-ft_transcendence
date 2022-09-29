import { Logger } from '@nestjs/common';
interface PlayerType {
    id: string;
    login: string;
}
export declare class Room {
    logger: Logger;
    roomlenght: number;
    id: number;
    roomMembers: string[];
    roomPlayers: PlayerType[];
    roomName: string;
    constructor(roomName: string);
    joinPlayer(login: string, id: string): void;
    getPlayer(id: string): PlayerType;
    getPlayerbyLogin(id: string): PlayerType;
    debug(): void;
}
export {};
