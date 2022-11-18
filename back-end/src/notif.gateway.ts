import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';


@WebSocketGateway(3001,{
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  namespace: 'notif'
} )

export class NotifGateway implements  OnGatewayConnection{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('NotifGateway');
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(client: Socket, ...args: any[]) {
   }
}
