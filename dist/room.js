"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const common_1 = require("@nestjs/common");
class Room {
    constructor(roomName) {
        this.logger = new common_1.Logger('RoomLogger');
        this.roomlenght = 0;
        this.id = 0;
        this.roomMembers = [];
        this.roomPlayers = [];
        this.roomName = roomName;
    }
    joinPlayer(login, id) {
        this.roomPlayers.push({ login, id });
    }
    getPlayer(id) {
        console.log("players number : ", this.roomPlayers.length);
        for (let i = 0; i < this.roomPlayers.length; i++) {
            console.log(this.roomPlayers[i].id + " " + id);
            if (this.roomPlayers[i].id === id) {
                return this.roomPlayers[i];
            }
        }
        return null;
    }
    getPlayerbyLogin(id) {
        console.log("room lenht " + this.roomPlayers.length);
        for (let i = 0; i < this.roomPlayers.length; i++) {
            console.log("loop " + this.roomPlayers[i].login);
            console.log("loop " + id);
            if (this.roomPlayers[i].login === id) {
                console.log("found");
                return this.roomPlayers[i];
            }
        }
        return null;
    }
    debug() {
        console.log("roomName : " + this.roomName);
        console.log("roomlenght : " + this.roomlenght);
        console.log("roomPlayers  : {");
        for (let index = 0; index < this.roomPlayers.length; index++) {
            console.log("id : " + this.roomPlayers[index].id);
            console.log("login : " + this.roomPlayers[index].login);
        }
        console.log("}");
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map