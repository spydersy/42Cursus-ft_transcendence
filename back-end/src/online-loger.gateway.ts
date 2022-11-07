import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger, UseGuards } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
 import { ChatService } from './chat/chat.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { SOCKET } from '@prisma/client';
interface UserType {
 socketId : string[],
 userid : string,
 gameStatu : boolean,
}



  @WebSocketGateway(3001, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    namespace : "online"

 })
 export class OnlineLogerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService,
              private prisma: PrismaService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('OnlineLogerGateway');
  onLineArray  : UserType[] = [];
  // @UseGuards(OnlineGuard)
  // @SubscribeMessage('AddOnlineUser')
  // async handleMessage(client: Socket, payload) {
  //   let onlineArr: string[] = [];
  //   let inGameArr: string[] = [];

  //   const online = await this.prisma.websockets.findMany({where: {type: SOCKET.ONLINE,} });
  //   const ingame = await this.prisma.websockets.findMany({where: {type: SOCKET.GAME,} });
  //   online.forEach(element => {
  //     if (onlineArr.includes(element.userLogin) === false)
  //       onlineArr.push(element.userLogin);
  //   });
  //   ingame.forEach(element => {
  //     if (inGameArr.includes(element.userLogin) === false)
  //       inGameArr.push(element.userLogin);
  //   });
  //   console.log("__EMIT__EVENT__DBG__ : ", {onlineArr, inGameArr});
  //   this.server.emit('ConnectedUser', {onlineArr, inGameArr});
  // }
  @SubscribeMessage('AddOnlineUser')
   handleConnect(client: Socket, payload) {


       var i = this.getIndexLogin(payload);
      if (i === -1)
      {

        var test  : UserType = {socketId : [client.id ], userid : payload , gameStatu : false}
        this.onLineArray.push(test)
      }
      else
      {
        console.log("______BGGGG___: ", this.onLineArray[i].socketId.includes(client.id.toString()))
        if( this.onLineArray[i].socketId.includes(client.id.toString()) === false)
          this.onLineArray[i].socketId.push(client.id)

      }



    this.debug()

    this.server.emit('ConnectedUser', this.onLineArray);
  }




  afterInit(server: Server) {
   this.logger.log('Init OnlineLogerGateway');
  }

  getIndex( id : string) {
    for (let i = 0; i < this.onLineArray.length; i++) {
      const element = this.onLineArray[i];
      if (element.socketId.includes(id))
        return i;
    }
    return -1
  }
  getIndexLogin( log : string) {
    for (let i = 0; i < this.onLineArray.length; i++) {
      const element = this.onLineArray[i];
      if (element.userid === log)
        return i;
    }
    return -1
  }

   handleDisconnect(client) {
  var index = this.getIndex(client.id.toString())
  console.log("___DBG__INDEX :", index)
    if (index !== -1)
    {

      var i = this.onLineArray[index].socketId.indexOf(client.id);
      if (i !== -1)
        this.onLineArray[index].socketId.splice(i, 1);
      if (this.onLineArray[index].socketId.length === 0)
        this.onLineArray.splice(index , 1);


    }
    this.debug()
    this.server.emit('ConnectedUser', this.onLineArray);
  }
  debug(){
    for (let i = 0; i < this.onLineArray.length; i++) {
      const element = this.onLineArray[i];
      // console.log("{")
      // console.log("UserId : " , element.userid)
      // console.log("socketId : " , element.socketId)
      // console.log("}")
    }
  }
  // async handleDisconnect(client) {
  //   var index = this.getIndex(client.id)
  //   try {
  //     console.log("__DELETE__SOCKET__ : ",  client);
  //     await this.prisma.websockets.delete({
  //       where: {socketId: client.id,}
  //     });
  //   }
  //   catch {
  //     console.log("DO SOMETHING . . .");
  //   }
  //  this.logger.log(`Client disconnected: ${client.id}`);
  //  this.server.emit('DisconnectedUser', {});
  // }

  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }