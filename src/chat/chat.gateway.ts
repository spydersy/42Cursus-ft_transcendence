import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
 
 interface Person {
  name: string,
  text: string,
  room: string,
 }
 @WebSocketGateway(3001, {
   cors: {
     origin: '*',
   },
 })   // @WebSocketGateway decorator gives us access to the socket.io functionality.

 /*We also implement three interfaces OnGatewayInit, OnGatewayConnection 
 and OnGatewayDisconnect which we use to log some key states of our application*/
 export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
   // we created a member variable called server which is decorated with @WebsocketServer() which gives us access to the websockets server instance.
  @WebSocketServer() server: Server; 

  private logger: Logger = new Logger('ChatGateway');
//The handleMessage() function is also decorated with @SubscribeMessage() which makes it listen to an event named msgToServer.
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log(payload);
    //We make use of the instance in our handleMessage() function where we send data to all clients connected to the server using the emit() function   
    this.server.emit('chatToClient', payload);
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