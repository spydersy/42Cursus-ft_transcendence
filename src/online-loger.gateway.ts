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
 import { WsGuard } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { SOCKET } from '@prisma/client';

  @UseGuards(WsGuard)
  @WebSocketGateway(8001, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
 })
 export class OnlineLogerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService,
              private prisma: PrismaService) {}

  @WebSocketServer() server: Server; 
  private logger: Logger = new Logger('OnlineLogerGateway');

  @UseGuards(WsGuard)
  @SubscribeMessage('AddOnlineUser')
  async handleMessage(client: Socket, payload) {
    let onlineArr: string[] = [];
    let inGameArr: string[] = [];

    const online = await this.prisma.websockets.findMany({where: {type: SOCKET.ONLINE,} });
    const ingame = await this.prisma.websockets.findMany({where: {type: SOCKET.GAME,} });
    online.forEach(element => {
      if (onlineArr.includes(element.userLogin) === false)
        onlineArr.push(element.userLogin);
    });
    ingame.forEach(element => {
      if (inGameArr.includes(element.userLogin) === false) 
        inGameArr.push(element.userLogin);
    });
    console.log("__EMIT__EVENT__DBG__ : ", {onlineArr, inGameArr});
    this.server.emit('ConnectedUser', {onlineArr, inGameArr});
  }

  afterInit(server: Server) {
   this.logger.log('Init OnlineLogerGateway');
  }
 
  async handleDisconnect(client) {
    try {
      console.log("__DELETE__SOCKET__ : ",  client);
      await this.prisma.websockets.delete({
        where: {socketId: client.id,}
      });
    }
    catch {
      console.log("DO SOMETHING . . .");
    }
   this.logger.log(`Client disconnected: ${client.id}`);
   this.server.emit('DisconnectedUser', {});
  }

  @UseGuards(JwtAuthGuard)
  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }