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


@WebSocketGateway(3001, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    namespace: 'chat'
 })
 
 export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  @UseGuards(WsGuard)
  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, payload) {
    console.log(payload)
    const ret = await this.chatService.SendMessage(payload.userId, payload.content, payload.channelId);
    if (ret.stat === true)
    {
      console.log(payload.channelId)
      this.server.to(payload.channelId).emit('chatToClient', ret.payload);
      var obj = {
        content: ret.payload.content,
        login: payload.login,
        channelId: ret.payload.channelId,
        displayName: ret.payload.displayName
      }
      console.log(obj)
      client.to(payload.channelId).emit('msg_event', obj);
    }
    else
      this.server.to(ret.login).emit('event', ret.payload)
  }

  @SubscribeMessage('addedMember')
  AddMemberToChannel(client: any, payload: any): void {
    client.join((payload.addedMember))
    client.to(payload.addedMember).emit("addedMember", payload.owner.login)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, rooms: Array<string>): void {
    this.logger.log(`joining rooms: ${client.id}`);
    for(var index in rooms)
    {
      client.join(rooms[index]);
    }
  }
  @SubscribeMessage('gameChallenge')
  SendGameChallenge(client: any, payload: any): void {
    this.logger.log("challengeGame" , payload)

    this.server.to(payload[0]).emit('challeneEvent', payload[1]);
  }
  @SubscribeMessage('sendFriendRequest')
  handleFriendRequest(client: Socket, payload: any): void {
    client.join(payload.reciver);
    client.to(payload.reciver).emit('recievedRequest', payload);
    client.leave(payload.reciver)
  }

  @SubscribeMessage('acceptFriendRequest')
  handleAcceptRequest(client: Socket, payload: any): void {
    client.join(payload.reciever);
    client.to(payload.reciever).emit('acceptedReq', payload)
    client.leave(payload.reciever)
  }
 

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
   client.leave(room);
   client.emit('leftRoom', room );
  }

  afterInit(server: Server) {
   this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }