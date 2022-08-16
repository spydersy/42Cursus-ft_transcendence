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
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let GameGateway = class GameGateway {
    constructor() {
        this.logger = new common_1.Logger('GameLogger');
        this.roomlenght = 0;
    }
    afterInit(server) {
        this.logger.log("After Init");
    }
    handleDisconnect(client) {
        this.logger.log("client is disconnected");
    }
    handleConnection(client, payload) {
        this.logger.log("client is connected");
    }
    handleJoinRoom(client, room) {
        this.logger.log("client " + client.id + " joined room " + room);
        var _room = this.wss.sockets.adapter.rooms.get(room);
        console.log(_room);
        if (_room && _room.has(client.id)) {
        }
        else {
            if (this.roomlenght < 2) {
                client.emit("RoomJoined", this.roomlenght);
            }
            else
                client.emit("roomFilled", this.roomlenght);
            this.roomlenght++;
        }
        this.logger.log(this.roomlenght);
        client.join(room);
        if (this.roomlenght == 2)
            this.wss.to(room).emit("StartGame");
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
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleJoinRoom", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map