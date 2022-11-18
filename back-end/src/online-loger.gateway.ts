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
import { WsGuard, WsGuard2 } from './auth/jwt.strategy';
import { JwtService } from "@nestjs/jwt";

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


  @UseGuards(WsGuard)
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
        if( this.onLineArray[i].socketId.includes(client.id.toString()) === false)
          this.onLineArray[i].socketId.push(client.id)
      }
    this.debug()
    this.server.emit('ConnectedUser', this.onLineArray);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('InGame')
   inGAme(client: Socket, payload) {


       var i = this.getIndexLogin(payload);
      if (i === -1)
      {

      }
      else
      {
        this.onLineArray[i].gameStatu = true;
       
      }
    this.debug()
    this.server.emit('ConnectedUser', this.onLineArray);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('outGame')
  outGame(client: Socket, payload) {


       var i = this.getIndexLogin(payload);
      if (i === -1)
      {

      }
      else
      {
        this.onLineArray[i].gameStatu = false;
       
      }
    this.debug()
    this.server.emit('ConnectedUser', this.onLineArray);
  }




  afterInit(server: Server) {
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


  @UseGuards(WsGuard)
  @SubscribeMessage('logout')
  logout(client , payload) {
    var index = this.getIndexLogin(payload)
    if (index !== -1)
    {
        this.onLineArray.splice(index , 1);
    }
    this.debug()
    this.server.emit('ConnectedUser', this.onLineArray);
  }
  debug(){
    for (let i = 0; i < this.onLineArray.length; i++) {
      const element = this.onLineArray[i];
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {

    const wsGuard2: WsGuard2 = new WsGuard2(new JwtService(), null);
    try {
      await wsGuard2.canActivate(client.handshake) === false
    } catch {
      client.disconnect();
      return;
    }
  }
 }