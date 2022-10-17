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
exports.UserRestrictionDto = exports.ChannelUserDto = exports.MessageDataDto = exports.UserNameDto = void 0;
const class_validator_1 = require("class-validator");
class UserNameDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{4,10}/),
    __metadata("design:type", String)
], UserNameDto.prototype, "newname", void 0);
exports.UserNameDto = UserNameDto;
class MessageDataDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageDataDto.prototype, "channelId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], MessageDataDto.prototype, "content", void 0);
exports.MessageDataDto = MessageDataDto;
class ChannelUserDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChannelUserDto.prototype, "channelId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChannelUserDto.prototype, "user", void 0);
exports.ChannelUserDto = ChannelUserDto;
class UserRestrictionDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRestrictionDto.prototype, "channelId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRestrictionDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRestrictionDto.prototype, "restriction", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserRestrictionDto.prototype, "duration", void 0);
exports.UserRestrictionDto = UserRestrictionDto;
//# sourceMappingURL=Inputs.dto.js.map