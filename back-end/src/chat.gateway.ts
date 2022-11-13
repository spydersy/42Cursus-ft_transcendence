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


 })   // @WebSocketGateway decorator gives us access to the socket.io functionality.

 /*We also implement three interfaces OnGatewayInit, OnGatewayConnection
 and OnGatewayDisconnect which we use to log some key states of our application*/
 export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}
   // we created a member variable called server which is decorated with @WebsocketServer() which gives us access to the websockets server instance.
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
//The handleMessage() function is also decorated with @SubscribeMessage() which makes it listen to an event named msgToServer.
  @UseGuards(WsGuard)
  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, payload) {
    const ret = await this.chatService.SendMessage(payload.userId, payload.content, payload.channelId);
    if (ret.stat === true)
    {
      this.server.to(payload.channelId).emit('chatToClient', ret.payload);
      // this.server.to(payload.channelId).emit('event', ret.payload);
      client.to(payload.channelId).emit('msg_event', ret.payload);
    }
    else
      this.server.to(ret.login).emit('event', ret.payload)
    
  }


  
  @SubscribeMessage('addedMember')
  AddMemberToChannel(client: any, payload: any): void {
    client.join((payload.addedMember))
    client.to(payload.addedMember).emit("addedMember", payload.owner.login)
    // client.to(payload[0]).emit('challeneEvent', payload[1]);
  }
  

  @UseGuards(WsGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, rooms: Array<string>): void {
    this.logger.log(`joining rooms: ${client.id}`);
    for(var index in rooms)
    {

      client.join(rooms[index]);
    }
  //  client.emit('joinedRoom', room );
  }
  @SubscribeMessage('gameChallenge')
  SendGameChallenge(client: any, payload: any): void {
    client.to(payload[0]).emit('challeneEvent', payload[1]);
  }
  @SubscribeMessage('sendFriendRequest')
  handleFriendRequest(client: Socket, payload: any): void {
    client.join(payload.reciver);
    client.to(payload.reciver).emit('recievedRequest', payload);
    client.leave(payload.reciver)
    // client.to(payload[0]).emit('challeneEvent', payload[1]);
  }

  // @SubscribeMessage('connection')
  // handleCon() {
  //   console.log('connected');
  // }

  @SubscribeMessage('acceptFriendRequest')
  handleAcceptRequest(client: Socket, payload: any): void {
    client.join(payload.reciever);
    client.to(payload.reciever).emit('acceptedReq', payload)
    client.leave(payload.reciever)
  }

  // @SubscribeMessage('declineFriendRequest')
  // handleDeclineRequest(client: Socket, payload: any): void {
  //   // console.log('___requestd Login___', payload)
  //   client.join(payload.reciever);
  //   client.to(payload.reciever).emit('declineReq', payload.accepter)
  //   client.leave(payload.reciever)
  // }

  @SubscribeMessage('authEvent')
  handleAuthEvent(client: Socket, payload: string): void {
    // function to store new stat => ret
    // if (ret === true) {
    // emit(friends, online);
    //}
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