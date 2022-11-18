import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
import { Logger, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { WsGuard, WsGuard2 } from './auth/jwt.strategy';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from "@nestjs/jwt";


@WebSocketGateway(3001, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    namespace: 'chat'
 })
 
 export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService, private prisma: PrismaService) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  async GetNotAllowedUsersInChannel(userId: number, channelId: string)
  {
    let fitredUsers:  any[] = [];
    let notAllowedUsers = await  this.prisma.blocks.findMany({
      where: {userId: userId}
    });
    const usersInChannel = await  this.prisma.channelsUsers.findMany({
      where: {
        channelId: channelId
      },
      include:  {
        user: true
      }
    });
    notAllowedUsers.forEach(element => {
      for (let index = 0; index < usersInChannel.length; index++) {
        if (element.blockedId ===  usersInChannel[index].userId) {
          fitredUsers.push(usersInChannel[index].user.login);
          break;
        }
      }
    });
    return fitredUsers;
  }


  @UseGuards(WsGuard)
  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, payload) {
    const ret = await this.chatService.SendMessage(payload.userId, payload.content, payload.channelId);
    if (ret.stat === true)
    {
      let blockedUsers : string[] = await this.GetNotAllowedUsersInChannel(payload.userId, payload.channelId)
      this.server.to(payload.channelId).except(blockedUsers).emit('chatToClient', ret.payload);
      var obj = {
        content: ret.payload.content,
        login: payload.login,
        channelId: ret.payload.channelId,
        displayName: ret.payload.displayName
      }
      client.to(payload.channelId).except(blockedUsers).emit('msg_event', obj);
    }
    else
    {
      this.server.to(ret.login).emit('event', ret.payload)
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('addedMember')
  AddMemberToChannel(client: any, payload: any): void {
    client.join((payload.addedMember))
    client.to(payload.addedMember).emit("addedMember",  payload.owner.login )
    client.leave((payload.addedMember))

  }


  @UseGuards(WsGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, rooms: Array<string>): void {
    for(var index in rooms)
    {
      client.join(rooms[index]);
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('gameChallenge')
  SendGameChallenge(client: any, payload: string[]): void {

    client.join(payload[0]);
    client.to(payload[0]).emit('challeneEvent', payload[1]);
    client.leave(payload[0]);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('sendFriendRequest')
  handleFriendRequest(client: Socket, payload: any): void {
    client.join(payload.reciver);
    client.to(payload.reciver).emit('recievedRequest', payload);
    client.leave(payload.reciver)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('leave')
  handlelogour(client: Socket, payload: any): void {
    client.join(payload.reciver);
    client.to(payload.reciver).emit('recievedRequest', payload);
    client.leave(payload.reciver)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('acceptFriendRequest')
  handleAcceptRequest(client: Socket, payload: any): void {
    client.join(payload.reciever);
    client.to(payload.reciever).emit('acceptedReq', payload)
    client.leave(payload.reciever)
  }
 

  @UseGuards(WsGuard)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, rooms: Array<string>): void {
    for(var index in rooms)
    {
      client.leave(rooms[index]);
    }
  }

  afterInit(server: Server) {
  }

  handleDisconnect(client: Socket) {
  }

  async handleConnection(client: Socket, ...args: any[]) {

    const wsGuard2: WsGuard2 = new WsGuard2(new JwtService(), null);
    try {
      await wsGuard2.canActivate(client.handshake) === false
    } catch {
      client.disconnect();
      return;
    }
  }
 }