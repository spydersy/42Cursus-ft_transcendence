import { Logger } from '@nestjs/common';
export declare class Room {
    logger: Logger;
    roomlenght: number;
    id: number;
    roomMembers: string[];
    constructor(data: any);
}
