import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPositionDto } from './dtos/updadeposition.dto';
import { toglMuteDto } from './dtos/toglMute.dto';
export declare class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {
    private readonly service;
    constructor(service: RoomService);
    wss: Server;
    private logger;
    private activeSockets;
    handleDisconnect(client: any): Promise<void>;
    afterInit(server: any): void;
    handleJoin(client: Socket, payload: JoinRoomDto): Promise<void>;
    handleMove(client: Socket, payload: UpdateUserPositionDto): Promise<void>;
    handleToglMute(_: Socket, payload: toglMuteDto): Promise<void>;
    callUser(client: Socket, data: any): Promise<void>;
    makeAnswer(client: Socket, data: any): Promise<void>;
}
