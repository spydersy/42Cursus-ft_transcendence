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
const room_1 = require("./room");
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
        this.roomslenght = 0;
        this.roomArray = [];
    }
    afterInit(server) {
        this.logger.log("After Init");
    }
    playerExist(client, login) {
        console.log("roomArray length :" + this.roomArray.length);
        for (let i = 0; i < this.roomArray.length; i++) {
            var room = this.roomArray[i];
            var player = room.getPlayerbyLogin(login);
            if (player)
                return true;
        }
        return false;
    }
    JoinPlayer(client, login) {
        var roomslenght = this.roomArray.length;
        if (this.roomArray[roomslenght - 1].roomPlayers.length === 2) {
            var roomName = this.roomArray[roomslenght - 1].roomName;
            var lastRoomPlayers = this.roomArray[roomslenght - 1].roomPlayers;
            this.wss.to(roomName).emit("startGame", { player1: lastRoomPlayers[0].login, player2: lastRoomPlayers[1].login });
            this.logger.log("startgame emited");
        }
    }
    getRoombyPlayerId(id) {
        for (let i = 0; i < this.roomArray.length; i++) {
            const element = this.roomArray[i].getPlayer(id);
            if (element)
                return this.roomArray[i];
        }
        return null;
    }
    RemovePlayer(client, id) {
        for (let i = 0; i < this.roomArray.length; i++) {
            var room = this.roomArray[i];
            var player = room.getPlayer(id);
            console.log(player);
            if (!player)
                continue;
            if (room.roomPlayers.includes(player)) {
                client.leave(room.roomName);
                room.roomPlayers.splice(0, 2);
                this.roomArray.splice(i, 1);
                this.wss.to(room.roomName).emit("endGame");
                return;
            }
        }
    }
    AddtoRoomArray(client, login) {
        this.logger.log("After Init");
        var roomslenght = this.roomArray.length;
        if (roomslenght === 0) {
            const newRoom = new room_1.Room("room" + (roomslenght + 1));
            newRoom.joinPlayer(login, client.id);
            this.roomArray.push(newRoom);
            roomName = this.roomArray[roomslenght].roomName;
        }
        else {
            roomName = this.roomArray[roomslenght - 1].roomName;
            if (this.roomArray[roomslenght - 1].roomPlayers.length < 2) {
                this.roomArray[roomslenght - 1].joinPlayer(login, client.id);
            }
            else {
                const newRoom = new room_1.Room("room" + (roomslenght + 1));
                newRoom.joinPlayer(login, client.id);
                this.roomArray.push(newRoom);
            }
        }
        var roomName = this.roomArray[this.roomArray.length - 1].roomName;
        client.join(roomName);
    }
    handleDisconnect(client) {
        this.logger.log("client is disconnected");
        this.RemovePlayer(client, client.id);
        for (let index = 0; index < this.roomArray.length; index++) {
            this.roomArray[index].debug();
        }
    }
    handleConnection(client, payload) {
        this.logger.log("client is connected " + client.id);
    }
    playerConnect(client, payload) {
        this.logger.log("player connected:  " + client.id + " : " + payload);
        if (this.playerExist(client, payload) === false) {
            console.log(payload + ": Player does not exist");
            this.AddtoRoomArray(client, payload);
            this.JoinPlayer(client, payload);
            for (let index = 0; index < this.roomArray.length; index++) {
                this.roomArray[index].debug();
            }
        }
    }
    player1moved(client, payload) {
        var room = this.getRoombyPlayerId(client.id);
        if (room) {
            this.wss.to(room.roomName).emit("player1moved", payload);
        }
    }
    player2moved(client, payload) {
        var room = this.getRoombyPlayerId(client.id);
        if (room) {
            this.wss.to(room.roomName).emit("player2moved", payload);
        }
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
    (0, websockets_1.SubscribeMessage)('playerConnect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "playerConnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('player1move'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "player1moved", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('player2move'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "player2moved", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map