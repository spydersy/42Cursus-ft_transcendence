import { SubscribeMessage, WebSocketGateway , OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect , WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { get } from 'http';
import { Controller, Get } from '@nestjs/common';
import { start } from 'repl';
import { GameService } from './game/game.service';

@WebSocketGateway(3001, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    
 })  
export class GameGateway implements OnGatewayInit , OnGatewayConnection  , OnGatewayDisconnect{


  @WebSocketServer() wss : Server
  private logger: Logger = new Logger('GameLogger')
  private roomslenght: number = 0
  private roomArray: GameService[] = [];//Room[] = []



  afterInit(server: any) {
    this.logger.log("After Init")
    // console.log( server.adapter.rooms)
   
  }
  playerExist(client : any , login  : string)
  {
        console.log("roomArray length :" +this.roomArray.length)

    for (let i = 0; i < this.roomArray.length; i++) {
      var room = this.roomArray[i];
      var player = room.getPlayerbyLogin(login )
      if (player)
        return  true;
      
    }
    return false
  }
  JoinPlayer(client : any , login : string)
  {
    var roomslenght = this.roomArray.length;

    if (this.roomArray[roomslenght - 1].roomPlayers.length === 2)
    {
      var roomName = this.roomArray[roomslenght - 1].roomName
      var lastRoomPlayers = this.roomArray[roomslenght - 1].roomPlayers
      this.wss.to(roomName).emit("startGame", {player1 : lastRoomPlayers[0].login , player2 :  lastRoomPlayers[1].login })
      this.logger.log("startgame emited")
      
      // console.log(client.adapter)
    }
  }

  getRoombyPlayerId(id : string )
  {
    for (let i = 0; i < this.roomArray.length; i++) {
      const element = this.roomArray[i].getPlayer(id);
      if (element)
          return this.roomArray[i];
    }
    return null
  }

  RemovePlayer(client : any , id : string)
  {
    console.log("remove : " + id)
    for (let i = 0; i < this.roomArray.length; i++) {
      var room = this.roomArray[i];
      var player = room.getPlayer(id )
      console.log(player)
  
      // if (player)
      //   continue ;
      if (room.roomPlayers.includes(player))
      {
        console.log("remove : " +room.roomName)

        client.leave(room.roomName)
        room.roomPlayers.splice(0, 2);
        this.roomArray.splice(i, 1)
        this.wss.to(room.roomName).emit("endGame")

        return ;
      }
    }
  
  }


  AddtoRoomArray(client : any , login : string) {
    this.logger.log("After Init")
    var roomslenght = this.roomArray.length;

    if (roomslenght === 0)
    {
      const  newRoom = new GameService("room" +( roomslenght + 1))
      newRoom.joinPlayer(login , client.id)
      this.roomArray.push(newRoom)
      roomName = this.roomArray[roomslenght].roomName
    }
    else
    {
      roomName = this.roomArray[roomslenght - 1].roomName
      if (this.roomArray[roomslenght - 1].roomPlayers.length  < 2)
      {
          this.roomArray[roomslenght - 1].joinPlayer(login , client.id)
            
      }
      else
      {
        const  newRoom = new GameService("room" +( roomslenght + 1))
        newRoom.joinPlayer(login , client.id)
        this.roomArray.push(newRoom)
      }
    }
     var roomName = this.roomArray[this.roomArray.length - 1].roomName
    client.join(roomName)


  }


  handleDisconnect(client: any)
  {
    this.logger.log("client is disconnected")
    this.RemovePlayer(client , client.id)
    for (let index = 0; index < this.roomArray.length; index++) {
      this.roomArray[index].debug();
   }
  }



  @SubscribeMessage('msgToServer')
  handleConnection(client: any, payload: any): void {

    this.logger.log("client is connected "  + client.id)

  }

  @SubscribeMessage('playerConnect')
    playerConnect(client: any, payload: any): void {
    this.logger.log("player connected:  "  + client.id + " : " + payload)
    if (this.playerExist(client , payload) === false)
    {
      console.log(payload + ": Player does not exist" )
      this.AddtoRoomArray(client , payload)
      this.JoinPlayer(client , payload)
      for (let index = 0; index < this.roomArray.length; index++) {
         this.roomArray[index].debug();

      }

    }
  }

  @SubscribeMessage('player1Moved')
  player1moved(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      console.log("player one moved")
      this.wss.to(room.roomName).emit("player1moved" , payload)
    }
  }

  @SubscribeMessage('player2Moved')
  player2moved(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      this.wss.to(room.roomName).emit("player2moved" , payload)
    }

  }
  @SubscribeMessage('player1Scored')
  player1Scored(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      var i = this.roomArray.indexOf(room)
      this.roomArray[i].incrementScore(1)
      this.wss.to(room.roomName).emit("playerscored" , this.roomArray[i].score)
    }
  }
  @SubscribeMessage('player2Scored')
  player2Scored(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      var i = this.roomArray.indexOf(room)
      this.roomArray[i].incrementScore(2)
      this.wss.to(room.roomName).emit("playerscored" ,  this.roomArray[i].score)
    }
  }
  @SubscribeMessage('moveBall')
  moveBall(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      this.wss.to(room.roomName).emit("moveBallClient" , payload)
    }
    // console.log("player1 moved" + payload)


    
  }
}

