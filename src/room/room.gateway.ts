import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPositionDto } from './dtos/updadeposition.dto';
import { toglMuteDto } from './dtos/toglMute.dto';
import { inRoom } from './dtos/in.Room';
import { Position } from './schemas/position.schama';


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

  
  async handleDisconnect(client: any) {
    const existingOnSocket = this.activeSockets.find(
      (socket) => socket.id === client.id
    );
    if(!existingOnSocket) return;

     this.activeSockets.filter(
      (socket) => socket.id !== client.id
     );

     const dto = {
      link: existingOnSocket.room,
      userId: existingOnSocket.userId,
      inRoom: false
    } as inRoom;
    await this.service.deleteUserPosition(client.id, dto);
     client.broadcast.emit(`${existingOnSocket.room}-remove-user`,{socketId: client.id})

    this .logger.debug(`Client: ${client.id} disconnected`);
    
    
  }
  afterInit(server: any) {
    this .logger.log('Gateway initialized');
  }

  @SubscribeMessage('join')
  async handleJoin (client: Socket, payload: JoinRoomDto){
    const { link, userId } = payload;
    const existingOnSocket = this.activeSockets.find(
      (socket) => socket.room === link && socket.id === client.id);

      if(!existingOnSocket){
        this.activeSockets.push({room:link, id: client.id,userId});
      // Código adicionado para obter a posição anterior do usuário
      const previousPosition = await this.service.findPreviousUserPosition(link, userId);
      const usersInRoom = await this.service.listUserPositionsByLink(link);

      let x = 2;
      let y = 2;
      if(previousPosition.length > 0){
        x = previousPosition[0].x;
        y = previousPosition[0].y;
      }

        const dto = {
          link,
          userId,
          x: x,
          y: y,
          orientation : "down"
        } as UpdateUserPositionDto
        // Código adicionado para garantir que a posição inicial de cada cliente seja diferente dos outros
        usersInRoom.map((user) => {
          if (user.x === dto.x && user.y === dto.y) {
            dto.x = Math.floor(Math.random() * 8) + 1;  
            dto.y = Math.floor(Math.random() * 8) + 1;
          }
        });

        await this.service.updateUserPosition(client.id, dto);

        const users = await this.service.listUserPositionsByLink(link);

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
      const users = await this.service.listUserPositionsByLink(link);
        this.wss.emit(`${link}-update-user-list`,{users});

  }

  @SubscribeMessage('toggl-mute-user')
  async handleToglMute (_: Socket, payload: toglMuteDto){
    const {link} = payload;

      await this.service.updateUserMute(payload);
      const users = await this.service.listUserPositionsByLink(link);
      this.wss.emit(`${link}-update-user-list`, {users});
        
      }

      @SubscribeMessage('call-user')
  async callUser (client: Socket, data: any){
    this.logger.debug(`callUser: ${client.id} to: ${data.to}`);
    client.to(data.to).emit('call-made',{
      offer: data.offer,
      socket: client.id
    });
   }

   @SubscribeMessage('make-answer')
  async makeAnswer (client: Socket, data: any){
    this.logger.debug(`makeAnswer: ${client.id} to: ${data.to}`);
    client.to(data.to).emit('answer-made',{
      answer : data.answer,
      socket: client.id
    });
  }
  
}
