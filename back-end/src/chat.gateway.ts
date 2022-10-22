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
    // this.server.emit('chatToClient', payload);
    // console.log("__CLIENT__DBG__  : ", client);
    // this.chatService.SendMessage();
    // post to db;
    //We make use of the instance in our handleMessage() function where we send data to all clients connected to the server using the emit() function   
    // axios.post("http://localhost:8000/chat/sendMessage" ,{ "content" : payload.content,
    //   'channelId' : payload.channelId + ""
    // }, 
    //   {withCredentials: true} 
    // ).then((res)=>{
    //   console.log(res.data)
    // }).catch((err)=>{
    //   console.log(err)
    //   })
  }
  @UseGuards(WsGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, rooms: Array<string>): void {
    this.logger.log(`joining rooms: ${client.id}`);
    for(var index in rooms)
      client.join(rooms[index]);
  //  client.emit('joinedRoom', room );
  }
  @SubscribeMessage('gameChallenge')
  SendGameChallenge(client: any, payload: any): void {
    console.log("______DBG____ CHALLENGEGAME : " , payload[1])
    client.to(payload[0]).emit('challeneEvent', payload[1]);
  }
  
  // @SubscribeMessage('connection')
  // handleCon() {
  //   console.log('connected');
  // }

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