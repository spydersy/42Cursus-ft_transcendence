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
  private roomArray: string[] = []

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
    client.emit("disconnected")
    // console.log("client is connected")

  }

  
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, args: any): void {
    this.logger.log("client " + client.id + " joined  " + args.name + " : " + args.room)
    var _room = this.wss.sockets.adapter.rooms.get(args.room);
    if (this.roomArray.includes(args.name))
    {
      
    }
    else
    {
        client.join(args.room)
        this.roomArray.push(args.name)
        client.emit("RoomJoined",this.roomArray.length )
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
    //    
      
    //   }
    //   else
    //     client.emit("roomFilled",this.roomlenght )
    //   this.roomlenght++; 
    // }


    // this.logger.log(this.roomlenght)
  
    // client.join(room[0])
    if (this.roomArray.length == 2)
        this.wss.to(args.room).emit("StartGame" )

    // console.log("client is connected")
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: any, args: any): void {
    this.logger.log("mattet")
    var i =     this.roomArray.indexOf(args.name);
    if(i != -1)
	    this.roomArray.splice(i, 1);
    client.leave(args.room)


    // console.log("client is connected")
  }
}
