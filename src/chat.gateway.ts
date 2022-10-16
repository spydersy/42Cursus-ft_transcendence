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

 
//  interface Person {
//   content: string,
//   channelId: string
//  }
 @WebSocketGateway(3001, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
    
 })   // @WebSocketGateway decorator gives us access to the socket.io functionality.

 /*We also implement three interfaces OnGatewayInit, OnGatewayConnection 
 and OnGatewayDisconnect which we use to log some key states of our application*/
 export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}
   // we created a member variable called server which is decorated with @WebsocketServer() which gives us access to the websockets server instance.
  @WebSocketServer() server: Server; 

  private logger: Logger = new Logger('ChatGateway');
//The handleMessage() function is also decorated with @SubscribeMessage() which makes it listen to an event named msgToServer.
  
  @SubscribeMessage('chatToServer')
    async handleMessage(client: Socket, payload) {
    console.log("__PAYLOAD__DBG__ : ", payload.content);

    await this.chatService.SendMessage(payload.userId, payload.content, payload.channelId);
    this.server.emit('chatToClient', payload);
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
 
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
  
   client.join(room);
   client.emit('joinedRoom', room );
  }

  // @SubscribeMessage('connection')
  // handleCon() {
  //   console.log('connected');
  // }

  @SubscribeMessage('leaveRoom')
  handleLeftRoom(client: Socket, room: string): void {
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