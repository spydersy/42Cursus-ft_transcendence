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
import { OnlineGuard, WsGuard } from './auth/jwt.strategy';

@WebSocketGateway(3001, {
    cors: {
      // origin: process.env.FRONTEND_URL,
      origin: "http://localhost:3000",
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
    console.log("__PAYLOAD__DBG__ : ", payload);
    // nest-container | __RET__DBG__ :  {
    //   nest-container |   id: 52,
    //   nest-container |   senderId: 62528,
    //   nest-container |   channelId: 'd178f7ff-5c50-476f-8af6-b53051896d26',
    //   nest-container |   content: 'xxxxxxx',
    //   nest-container |   date: 2022-10-19T04:55:40.240Z
    //   nest-container | }
    const ret = await this.chatService.SendMessage(payload.userId, payload.content, payload.channelId);
    console.log("PAYLOAD : ", payload);
    if (ret.stat === true)
    {
      this.server.to(payload.channelId).emit('chatToClient', ret.payload);
      // this.server.to(payload.channelId).emit('event', ret.payload);
      client.to(payload.channelId).emit('msg_event', ret.payload);
    }
  }


  @UseGuards(WsGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, rooms: Array<string>): void {
    this.logger.log(`joining rooms: ${client.id}`);
    for(var index in rooms)
    {

      // console.log("__ROOM__DBG__ : ", rooms[index])
      client.join(rooms[index]);
    }
  //  client.emit('joinedRoom', room );
  }
  @SubscribeMessage('gameChallenge')
  SendGameChallenge(client: any, payload: any): void {
    console.log("______DBG____ CHALLENGEGAME : " , payload[1])
    client.to(payload[0]).emit('challeneEvent', payload[1]);
  }
  @SubscribeMessage('sendFriendRequest')
  handleFriendRequest(client: Socket, payload: any): void {
    console.log('___FreindRequest____:',  payload)
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

    console.log('___requestd Login___', payload)
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
    console.log('___here___', payload)
    // function to store new stat => ret
    // if (ret === true) {
    // emit(friends, online);
    //}
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    console.log("__CLIENT__LEAVE__ROOM__DBG__ : ", room);
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