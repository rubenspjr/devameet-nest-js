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
exports.toglMuteDto = void 0;
const class_validator_1 = require("class-validator");
const joinroom_dto_1 = require("./joinroom.dto");
const room_messages_helper_1 = require("../helpers/room.messages.helper");
class toglMuteDto extends joinroom_dto_1.JoinRoomDto {
}
__decorate([
    (0, class_validator_1.IsBoolean)({ message: room_messages_helper_1.RoomMessagesHelper.JOIN_MUTE_NOT_VALID }),
    __metadata("design:type", Boolean)
], toglMuteDto.prototype, "muted", void 0);
exports.toglMuteDto = toglMuteDto;
//# sourceMappingURL=toglMute.dto.js.map