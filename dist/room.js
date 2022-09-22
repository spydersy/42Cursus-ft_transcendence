"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const common_1 = require("@nestjs/common");
class Room {
    constructor(data) {
        this.logger = new common_1.Logger('RoomLogger');
        this.roomlenght = 0;
        this.id = 0;
        this.roomMembers = [];
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map