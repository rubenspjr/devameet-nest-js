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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RoomService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meet_schema_1 = require("../meet/schemas/meet.schema");
const meetobject_schemas_1 = require("../meet/schemas/meetobject.schemas");
const position_schama_1 = require("./schemas/position.schama");
const user_service_1 = require("../user/user.service");
const room_messages_helper_1 = require("./helpers/room.messages.helper");
let RoomService = RoomService_1 = class RoomService {
    constructor(meetModel, objectModel, positionModel, userService) {
        this.meetModel = meetModel;
        this.objectModel = objectModel;
        this.positionModel = positionModel;
        this.userService = userService;
        this.logger = new common_1.Logger(RoomService_1.name);
    }
    async getRoom(link) {
        this.logger.debug(`getRoom - ${link}`);
        const meet = await this._getMeet(link);
        const objects = await this.objectModel.find({ meet });
        return {
            link,
            name: meet.name,
            color: meet.color,
            objects,
        };
    }
    async listUserPositionsByLink(link) {
        this.logger.debug(`listUserPositionsByLink - ${link}`);
        const meet = await this._getMeet(link);
        return await this.positionModel.find({ meet, inRoom: true });
    }
    async deleteUserPosition(clientId, dto) {
        this.logger.debug(`deleteUserPosition - ${clientId}`);
        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);
        if (!user) {
            throw new common_1.BadRequestException(room_messages_helper_1.RoomMessagesHelper.JOIN_USER_NOT_VALID);
        }
        const positionActual = Object.assign(Object.assign({}, dto), { clientId,
            user,
            meet, name: user.name, avatar: user.avatar });
        const position = await this.positionModel.findOne({
            user: user._id,
            meet: meet._id,
        });
        return await this.positionModel.findByIdAndUpdate(position._id, positionActual);
    }
    async updateUserPosition(clientId, dto) {
        this.logger.debug(`updateUserPosition - ${dto.link}`);
        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);
        if (!user) {
            throw new common_1.BadRequestException(room_messages_helper_1.RoomMessagesHelper.JOIN_USER_NOT_VALID);
        }
        const position = Object.assign(Object.assign({}, dto), { clientId,
            meet,
            user, name: user.name, avatar: user.avatar });
        const usersInRoom = await this.positionModel.find({ meet });
        const loogedUserInRoom = usersInRoom.find((u) => u.user.toString() === user._id.toString() || u.clientId === clientId);
        if (loogedUserInRoom) {
            await this.positionModel.findByIdAndUpdate({ _id: loogedUserInRoom._id }, position);
        }
        else {
            if (usersInRoom.length >= 10) {
                throw new common_1.BadRequestException(room_messages_helper_1.RoomMessagesHelper.ROOM_MAX_USERS);
            }
            await this.positionModel.create(position);
        }
    }
    async findPreviousUserPosition(link, userId) {
        const meet = await this.meetModel.findOne({ link });
        return await this.positionModel.find({ meet: meet._id, user: userId });
    }
    async updateUserMute(dto) {
        this.logger.debug(`updateUserMute - ${dto.link} - ${dto.userId}`);
        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId);
        await this.positionModel.updateMany({ user, meet }, { muted: dto.muted });
    }
    async _getMeet(link) {
        const meet = await this.meetModel.findOne({ link });
        if (!meet) {
            throw new common_1.BadRequestException(room_messages_helper_1.RoomMessagesHelper.JOIN_LINK_NOT_VALID);
        }
        return meet;
    }
};
RoomService = RoomService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meet_schema_1.Meet.name)),
    __param(1, (0, mongoose_1.InjectModel)(meetobject_schemas_1.MeetObject.name)),
    __param(2, (0, mongoose_1.InjectModel)(position_schama_1.Position.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map