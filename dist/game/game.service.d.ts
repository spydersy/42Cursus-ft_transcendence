import { Logger } from '@nestjs/common';
import { PlayerType } from '../dtos/Outputs.dto';
export declare class GameService {
    logger: Logger;
    roomlenght: number;
    id: number;
    roomMembers: string[];
    roomPlayers: PlayerType[];
    roomName: string;
    score: {
        score1: number;
        score2: number;
    };
    constructor(roomName: string);
    joinPlayer(login: string, id: string): void;
    getPlayer(id: string): PlayerType;
    getPlayerbyLogin(id: string): PlayerType;
    incrementScore(id: number): void;
    debug(): void;
}
