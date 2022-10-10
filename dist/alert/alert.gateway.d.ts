/// <reference types="node" />
import { Server } from 'http';
export declare class AlertGateway {
    server: Server;
    sendToAll(message: string): void;
}
