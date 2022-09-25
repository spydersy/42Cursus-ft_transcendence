import { Injectable } from '@nestjs/common';
// import { AuthenticationService } from '../authentication/authentication.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
 
@Injectable()
export class ChatService {
  constructor(
    //private readonly authenticationService: AuthenticationService,
  ) {
  }
 
  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    console.log("__CLIENT__DBG__FROM__GET__USER__FROM__SOCKET__", socket);
    return "spyder";
    // const user = await this.authenticationService.getUserFromAuthenticationToken(authenticationToken);
    // if (!user) {
    //   throw new WsException('Invalid credentials.');
    // }
    // return user;
  }
}