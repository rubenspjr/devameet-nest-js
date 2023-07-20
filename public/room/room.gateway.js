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
var RoomGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const room_service_1 = require("./room.service");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const joinroom_dto_1 = require("./dtos/joinroom.dto");
const updadeposition_dto_1 = require("./dtos/updadeposition.dto");
const toglMute_dto_1 = require("./dtos/toglMute.dto");
let RoomGateway = RoomGateway_1 = class RoomGateway {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(RoomGateway_1.name);
        this.activeSockets = [];
    }
    async handleDisconnect(client) {
        const existingOnSocket = this.activeSockets.find((socket) => socket.id === client.id);
        if (!existingOnSocket)
            return;
        this.activeSockets.filter((socket) => socket.id !== client.id);
        const dto = {
            link: existingOnSocket.room,
            userId: existingOnSocket.userId,
            inRoom: false
        };
        await this.service.deleteUserPosition(client.id, dto);
        client.broadcast.emit(`${existingOnSocket.room}-remove-user`, { socketId: client.id });
        this.logger.debug(`Client: ${client.id} disconnected`);
    }
    afterInit(server) {
        this.logger.log('Gateway initialized');
    }
    async handleJoin(client, payload) {
        const { link, userId } = payload;
        const existingOnSocket = this.activeSockets.find((socket) => socket.room === link && socket.id === client.id);
        if (!existingOnSocket) {
            this.activeSockets.push({ room: link, id: client.id, userId });
            const previousPosition = await this.service.findPreviousUserPosition(link, userId);
            const usersInRoom = await this.service.listUserPositionsByLink(link);
            let x = 2;
            let y = 2;
            if (previousPosition.length > 0) {
                x = previousPosition[0].x;
                y = previousPosition[0].y;
            }
            const dto = {
                link,
                userId,
                x: x,
                y: y,
                orientation: "down"
            };
            usersInRoom.map((user) => {
                if (user.x === dto.x && user.y === dto.y) {
                    dto.x = Math.floor(Math.random() * 8) + 1;
                    dto.y = Math.floor(Math.random() * 8) + 1;
                }
            });
            await this.service.updateUserPosition(client.id, dto);
            const users = await this.service.listUserPositionsByLink(link);
            this.wss.emit(`${link}-update-user-list`, { users });
            client.broadcast.emit(`${link}-add-user`, { user: client.id });
        }
        this.logger.debug(`Socket client: ${client.id} start to joinroom ${link}`);
    }
    async handleMove(client, payload) {
        const { link, userId, x, y, orientation } = payload;
        const dto = {
            link,
            userId,
            x,
            y,
            orientation
        };
        await this.service.updateUserPosition(client.id, dto);
        const users = await this.service.listUserPositionsByLink(link);
        this.wss.emit(`${link}-update-user-list`, { users });
    }
    async handleToglMute(_, payload) {
        const { link } = payload;
        await this.service.updateUserMute(payload);
        const users = await this.service.listUserPositionsByLink(link);
        this.wss.emit(`${link}-update-user-list`, { users });
    }
    async callUser(client, data) {
        this.logger.debug(`callUser: ${client.id} to: ${data.to}`);
        client.to(data.to).emit('call-made', {
            offer: data.offer,
            socket: client.id
        });
    }
    async makeAnswer(client, data) {
        this.logger.debug(`makeAnswer: ${client.id} to: ${data.to}`);
        client.to(data.to).emit('answer-made', {
            answer: data.answer,
            socket: client.id
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, joinroom_dto_1.JoinRoomDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('move'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, updadeposition_dto_1.UpdateUserPositionDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleMove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('toggl-mute-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, toglMute_dto_1.toglMuteDto]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleToglMute", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "callUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('make-answer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "makeAnswer", null);
RoomGateway = RoomGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomGateway);
exports.RoomGateway = RoomGateway;
//# sourceMappingURL=room.gateway.js.map