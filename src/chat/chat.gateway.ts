import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
 
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
 
  constructor(
    private readonly chatService: ChatService
  ) {
  }
 
  async handleConnection(socket: Socket) {
    console.log("__CLIENT__DBG__FROM__HANDLE__CONNECTION__ : ", socket);
    await this.chatService.getUserFromSocket(socket);
  }
 
  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const author = await this.chatService.getUserFromSocket(socket);
    console.log("__CONTENT__DBG__FROM__LISTEN__FORM__MESSAGES__ : ", content);
    console.log("__SOCKET__DBG__FROM__LISTEN__FORM__MESSAGES__ : ", socket);
 
    this.server.sockets.emit('receive_message', {
      content,
      author
    });
  }
}
