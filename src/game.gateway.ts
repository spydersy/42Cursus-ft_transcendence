import { SubscribeMessage, WebSocketGateway , OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect , WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayInit , OnGatewayConnection  , OnGatewayDisconnect{
  @WebSocketServer() wss : Server
  private logger: Logger = new Logger('GameLogger')
  private roomlenght: number = 0

  afterInit(server: any) {
    this.logger.log("After Init")
    
  }

  handleDisconnect(client: any)
  {
    this.logger.log("client is disconnected")

  }
  @SubscribeMessage('msgToServer')
  handleConnection(client: any, payload: any): void {
    this.logger.log("client is connected")
    // console.log("client is connected")

  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, room: string): void {
    this.logger.log("client " + client.id + " joined room " + room)
    var _room = this.wss.sockets.adapter.rooms.get(room);
    console.log(_room)
    
    if (_room && _room.has(client.id))
    {
      // var r = this.wss.sockets.adapter.rooms
      // var l = Object(r);
      
      // this.logger.log(l)
    }
    else
    {
      if (this.roomlenght < 2)
      {
        client.emit("RoomJoined",this.roomlenght )
      
      }
      else
        client.emit("roomFilled",this.roomlenght )
      this.roomlenght++; 
    }


    this.logger.log(this.roomlenght)
  
    client.join(room)
    if (this.roomlenght == 2)
        this.wss.to(room).emit("StartGame" )




    // console.log("client is connected")
  }
}
