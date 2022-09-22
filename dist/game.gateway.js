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
exports.GameGateway = exports.CatsController = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let CatsController = class CatsController {
    findAll() {
        return 'This action returns all cats';
    }
};
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CatsController.prototype, "findAll", null);
CatsController = __decorate([
    (0, common_2.Controller)('cats')
], CatsController);
exports.CatsController = CatsController;
let GameGateway = class GameGateway {
    constructor() {
        this.logger = new common_1.Logger('GameLogger');
        this.roomlenght = 0;
        this.roomArray = [];
    }
    afterInit(server) {
        this.logger.log("After Init");
    }
    handleDisconnect(client) {
        this.logger.log("client is disconnected");
    }
    handleConnection(client, payload) {
        this.logger.log("client is connected " + client.id);
    }
    handleJoinRoom(client, args) {
        this.logger.log("client " + client.id + " joined  " + args.name + " : " + args.room);
        var _room = this.wss.sockets.adapter.rooms.get(args.room);
        if (this.roomArray.includes(args.name)) {
        }
        else {
            client.join(args.room);
            this.roomArray.push(args.name);
            client.emit("RoomJoined", this.roomArray.length);
        }
        if (this.roomArray.length == 2)
            this.wss.to(args.room).emit("StartGame");
    }
    handleLeaveRoom(client, args) {
        this.logger.log("mattet");
        var i = this.roomArray.indexOf(args.name);
        if (i != -1)
            this.roomArray.splice(i, 1);
        client.leave(args.room);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleLeaveRoom", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map