import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPositionDto } from './dtos/updadeposition.dto';
import { ToglMuteDto } from './dtos/toglMute.sto';

type ActiveSocketType = {
  room:string;
   id:string;
  userId:string;
}

@WebSocketGateway({cors:true})
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(private readonly service:RoomService){}

  @WebSocketServer() wss: Server

  private logger = new Logger(RoomGateway.name);
  private activeSockets:ActiveSocketType[] = [];

  
  handleDisconnect(client: any) {
    this .logger.debug(`Client: ${client.id} disconnected`);
    
    
  }
  afterInit(server: any) {
    this .logger.log('Gateway initialized');
  }

  @SubscribeMessage('join')
  async handleJoin (client: Socket, payload:JoinRoomDto){
    const {link, userId} = payload;
    const existingONsoket = this.activeSockets.find(
      socket => socket.room === link && socket.id === client.id);

      if(!existingONsoket){
        this.activeSockets.push({room:link, id: client.id,userId});

        const dto = {
          link,
          userId,
          x: 2,
          y: 2,
          orientation : "down"
        } as UpdateUserPositionDto

        await this.service.updateUserPosition(client.id, dto);
        const users = await this.service.listUserPositionByLink(link);

        this.wss.emit(`${link}-update-user-list`,{users});

        client.broadcast.emit(`${link}-add-user`,{user:client.id});
      }

       this.logger.debug(`Socket client: ${client.id} start to joinroom ${link}`);

  }
  
  @SubscribeMessage('move')
  async handleMove (client: Socket, payload:UpdateUserPositionDto){
    const {link,userId, x, y, orientation} = payload;
      const dto = {
        link,
        userId,
        x,
        y,
        orientation
      } as UpdateUserPositionDto

      await this.service.updateUserPosition(client.id, dto);
      const users = await this.service.listUserPositionByLink(link);
        this.wss.emit(`${link}-update-user-list`,{users});

  }

  @SubscribeMessage('togl-mute-user')
  async handleToglMute (_: Socket, payload: ToglMuteDto){
    const {link} = payload;

      await this.service.updateUserMute(payload);
      const users = await this.service.listUserPositionByLink(link);
        this.wss.emit(`${link}-update-user-list`,{users});

  }
  
}
