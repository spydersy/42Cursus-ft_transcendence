"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineLogerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat/chat.service");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const prisma_service_1 = require("./prisma/prisma.service");
const client_1 = require("@prisma/client");
let OnlineLogerGateway = class OnlineLogerGateway {
    constructor(chatService, prisma) {
        this.chatService = chatService;
        this.prisma = prisma;
        this.logger = new common_1.Logger('OnlineLogerGateway');
    }
    async handleMessage(client, payload) {
        let onlineArr = [];
        let inGameArr = [];
        const online = await this.prisma.websockets.findMany({ where: { type: client_1.SOCKET.ONLINE, } });
        const ingame = await this.prisma.websockets.findMany({ where: { type: client_1.SOCKET.GAME, } });
        online.forEach(element => {
            if (onlineArr.includes(element.userLogin) === false)
                onlineArr.push(element.userLogin);
        });
        ingame.forEach(element => {
            if (inGameArr.includes(element.userLogin) === false)
                inGameArr.push(element.userLogin);
        });
        console.log("__EMIT__EVENT__DBG__ : ", { onlineArr, inGameArr });
        this.server.emit('ConnectedUser', { onlineArr, inGameArr });
    }
    afterInit(server) {
        this.logger.log('Init OnlineLogerGateway');
    }
    async handleDisconnect(client) {
        try {
            console.log("__DELETE__SOCKET__ : ", client);
            await this.prisma.websockets.delete({
                where: { socketId: client.id, }
            });
        }
        catch (_a) {
            console.log("DO SOMETHING . . .");
        }
        this.logger.log(`Client disconnected: ${client.id}`);
        this.server.emit('DisconnectedUser', {});
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OnlineLogerGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.WsGuard),
    (0, websockets_1.SubscribeMessage)('AddOnlineUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], OnlineLogerGateway.prototype, "handleMessage", null);
OnlineLogerGateway = __decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.WsGuard),
    (0, websockets_1.WebSocketGateway)(8001, {
        cors: {
            origin: '*',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        prisma_service_1.PrismaService])
], OnlineLogerGateway);
exports.OnlineLogerGateway = OnlineLogerGateway;
//# sourceMappingURL=online-loger.gateway.js.map