import { SubscribeMessage, WebSocketGateway , OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect , WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { get } from 'http';

import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayInit , OnGatewayConnection  , OnGatewayDisconnect{

  @WebSocketServer() wss : Server
  private logger: Logger = new Logger('GameLogger')
  private roomlenght: number = 0
  private roomArray: Array<string> = []

  afterInit(server: any) {
    this.logger.log("After Init")
    
  }

  handleDisconnect(client: any)
  {
    this.logger.log("client is disconnected")

  }



  @SubscribeMessage('msgToServer')
  handleConnection(client: any, payload: any): void {
    this.logger.log("client is connected "  + client.id)
    // console.log("client is connected")

  }

  
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, args: any): void {
    this.logger.log("client " + client.id + " joined  " + args.name + " : " + args.room)
    var _room = this.wss.sockets.adapter.rooms.get(args.room);
    if (this.roomArray.includes(args.name))
    {
        client.join(room[0])

    }
    else
    {
        this.roomArray.puch(args.name)
    }
    // if (_room && _room.has(client.id))
    // {
    //   // var r = this.wss.sockets.adapter.rooms
    //   // var l = Object(r);
      
    //   // this.logger.log(l)
    // }
    // else
    // {
    //   if (this.roomlenght < 2)
    //   {
    //     client.emit("RoomJoined",this.roomlenght )
      
    //   }
    //   else
    //     client.emit("roomFilled",this.roomlenght )
    //   this.roomlenght++; 
    // }


    // this.logger.log(this.roomlenght)
  
    // client.join(room[0])
    // if (this.roomlenght == 2)
    //     this.wss.to(room).emit("StartGame" )

    // console.log("client is connected")
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: any, room: string): void {
    this.roomlenght--;
    client.leave(room[0])


    // console.log("client is connected")
  }
}
