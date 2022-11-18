import { SubscribeMessage, WebSocketGateway , OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect , WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger , UseGuards } from '@nestjs/common';
import { get } from 'http';
import { Controller, Get } from '@nestjs/common';
import { start } from 'repl';
import { GameService } from './game/game.service';
import { WsGuard, WsGuard2 } from './auth/jwt.strategy';
import { MODE } from '@prisma/client';
import {v4 as uuidv4} from 'uuid';
import { emit } from 'process';
import { JwtService } from "@nestjs/jwt";


@WebSocketGateway(3001, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    namespace : "game"
 })



export class GameGateway implements OnGatewayInit , OnGatewayConnection  , OnGatewayDisconnect{

  @WebSocketServer() wss : Server
  private logger: Logger = new Logger('GameLogger')
  private roomslenght: number = 0
  private roomArray: GameService[] = [];



  afterInit(server: any) {
  }
 
  handleDisconnect(client: any)
  {
    this.RemovePlayer(client , client.id)
  }

  async handleConnection(client: any, payload: any) {

    const wsGuard2: WsGuard2 = new WsGuard2(new JwtService(), null);
    try {
      await wsGuard2.canActivate(client.handshake) === false
    } catch {
      client.disconnect();
      return;
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('endGame')
  async deleteRoom(client: any, payload: any) {
    var room = this.getRoombyLogin(payload)
    if (room !== null)
    {
      
      var i = this.roomArray.indexOf(room);
      this.roomArray[i].Stop()

      this.wss.emit("change" , this.getArrayData() )
      this.RemovePlayer(client , payload)
    }
    for (let index = 0; index < this.roomArray.length; index++) {
      client.leave(this.roomArray[index].roomName)
  }
}

  @SubscribeMessage('gameChallenge')
  gameChallenge(client: any, payload: {player1 : string ,player2 : string }): void {

    var i =  this.getRoombyLogin(payload.player1)

    if (this.getRoombyName(payload.player1+payload.player2) === -1  )
    {
    var newRoom = new GameService(payload.player1+payload.player2 , this.wss)

    newRoom.joinPlayer(payload.player1 , client.id)

    this.roomArray.push(newRoom)
  
    client.join(newRoom.roomName)

  }


  }

  @SubscribeMessage('gameAccept')
  gameAccept(client: any, payload: {player1 : string ,player2 : string }): void {


      var i = this.getRoombyName(payload.player1 + payload.player2)


      if (i !== -1)
      {
        client.join(this.roomArray[i].roomName)
        this.roomArray[i].joinPlayer(payload.player2 , client.id)
        this.wss.to(this.roomArray[i].roomName).emit("challengeAccepted")

      }



  }


  Play1v1(client: any, i : number): void {
    client.join(this.roomArray[i].roomName)

    if (this.roomArray[i].status === "1v1")
    {
      this.roomArray[i].StartGame();
        this.wss.to(this.roomArray[i].roomName).emit("startGame" , {player1: this.roomArray[i].roomPlayers[0].login , player2: this.roomArray[i].roomPlayers[1].login})
        this.wss.emit("change" , this.getArrayData() )
      }
      else
      {
        this.roomArray[i].status =  "1v1"

      }

  }
  @SubscribeMessage('checkEnd')
  CheckEndGames(client: any, i : number): void {
    for (let i = 0; i < this.roomArray.length; i++) {
      if (this.roomArray[i].status === "ENDED")
      this.roomArray.splice(i , 1)
    }
    this.wss.emit("change" , this.getArrayData() )
 

  }
  @SubscribeMessage('changeGameStatue')
  changeGame(client: any , login): void {
    var room = this.getRoombyLogin(login)
    if (room !== null)
    {
      var i = this.roomArray.indexOf(room);
      this.roomArray[i].state = "START"
    }
 

  }


  @SubscribeMessage('getLiveGames')
  getLive(client: any): void {
    client.emit("change" , this.getArrayData() )

  }

  @SubscribeMessage('Play')
  Play(client: any, payload: {login : string , mode : string}): void {
    for (let index = 0; index < this.roomArray.length; index++) {
      client.leave(this.roomArray[index].roomName)
  }
    var index = this.playerExist(client , payload.login)
    if (index === -1)
    {


      if (payload.mode === "classic")
      {
        this.AddtoRoomArray(client , payload.login)
        this.JoinPlayer(client , payload.login)

      }
      else if (payload.mode === "AI")
      {
        this.playAi(client , payload.login)
      }
      
    
    }
    else
    {

      if (payload.mode === "1v1")
      {
        this.Play1v1(client , index)
      }
      
    }
  }



  @SubscribeMessage('watchGame')
  addWatch(client: any, payload: any): void {
    var i = this.getRoombyName(payload)
    if (i === -1)
     client.emit('roomNotFound')
    else
    {
      client.join(payload)
      client.emit("watchGame" , {player1 : this.roomArray[i].roomPlayers[0].login , player2 : this.roomArray[i].roomPlayers[1].login})
    }
  }

  @SubscribeMessage('player1Moved')
  player1moved(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      if (payload.y <  1 - 0.15 && payload.y > 0)
      {
        var i = this.roomArray.indexOf(room);
        this.roomArray[i].paddel1.y = payload.y;
        this.wss.to(room.roomName).emit("player1moved" , payload)
      }
    }
  }

  
  @SubscribeMessage('player2Moved')
  player2moved(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      if (payload.y <  1 - 0.15 && payload.y > 0)
      {
        var i = this.roomArray.indexOf(room);
        this.roomArray[i].paddel2.y = payload.y;
        this.wss.to(room.roomName).emit("player2moved" , payload)
      }
    }

  }

  @SubscribeMessage('gameConnected')
  playerConnected(client: any, payload: any): void {
      var i = this.getRoombyLogin(payload.login)
      if (i !== null){
        if (i.status !== "waiting")
          client.emit("PlayerInGame" , i.roomName)
      }
  }

   hitWalls = (i : number,ballCord : any ,direction: any , width , height  ,paddel1 : any , paddel2 : any, )=>{

    if (ballCord.x + direction.x > 1 - ballCord.size /2  )
    {
      this.roomArray[i].incrementScore(1)
      this.wss.to( this.roomArray[i].roomName).emit("playerscored" ,  this.roomArray[i].score)

      this.wss.emit("changeScoreLive" , {index : i , score :this.roomArray[i].score  })
      this.checkScore(this.roomArray[i])

      return false
    }
    else if (ballCord.x + direction.x  <  ballCord.size /2  )
    {
      this.roomArray[i].incrementScore(2)
      this.wss.to( this.roomArray[i].roomName).emit("playerscored" ,  this.roomArray[i].score)
      this.wss.emit("changeScoreLive" , {index : i , score :this.roomArray[i].score  })
      this.checkScore(this.roomArray[i])

      return false


    }
    else if (ballCord.y <= ballCord.size /2 || ballCord.y  >= 1 - ballCord.size /2 )
        this.roomArray[i].direction.y = - this.roomArray[i].direction.y
    else if (this.detectCollision(paddel1 , ballCord , this.roomArray[i].direction) || this.detectCollision(paddel2 , ballCord , this.roomArray[i].direction))
    {
        this.roomArray[i].direction.x = ( -this.roomArray[i].direction.x) * 1.05;
    }
    return true

  }


   detectCollision(player : any , ballCord : any , direction : any) {
    const cx = ballCord.x + direction.x ;
    const cy = ballCord.y + direction.y;
    const r = 0.02 / 2 ;
    const [x1, y1, w1, h1] = [cx - r, cy - r, r * 2, r * 2];
    const x2 =player.x ;
    const y2 =player.y;
    const w2 = 0.02;
    const h2 = 0.15;

    const colliding = x1 < (x2 + w2) && (x1 + w1) > x2 &&
    y1 < (y2 + h2) && (y1 + h1) > y2;
    return colliding;

}
async checkScore (room : any) {

    if (room.score.score1  === 3  || room.score.score2  === 3 )
    {
      var i = this.roomArray.indexOf(room)

      this.wss.to(this.roomArray[i].roomName).emit("endGame" , {score: this.roomArray[i].score, roomPlayers :   this.roomArray[i].roomPlayers , status : this.roomArray[i].status })

      await this.roomArray[i].saveGame(this.roomArray[i].status !== "AiGame" ?   MODE.CLASSIC :  MODE.AIBUGGY)
      this.roomArray.splice(i, 1)
    }
}



moveAI(room : any )
 {
  var i = this.roomArray.indexOf(room)
   const h =  0.15 ;
   var yp : number ;
   var yb : number ;
   var q = ( room.paddel2.x -  room.ball.x ) / room.direction.x
   yp =  room.paddel2.y;
   yb =  room.ball.y + room.direction.y;
   var PreditctY : number =  yb +( room.direction.y * q) -( h / 2);
    this.roomArray[i].predicty = PreditctY
   var TableH : number =   1;

       if (PreditctY > 0 && PreditctY < TableH)
       {
         if (PreditctY >  yb && PreditctY < yb  + h)
           return ;
         else if (yp  > PreditctY)
            this.roomArray[i].paddel2.y = yp - 0.04
         else if (yp + (h / 2) < PreditctY)
            this.roomArray[i].paddel2.y = yp + 0.04

       }
       else if (PreditctY < TableH + (TableH / 2)  &&  PreditctY > TableH)
       {
           if (yp  + h < TableH  )
            this.roomArray[i].paddel2.y = yp + 0.04


       }
       else if (PreditctY < 0  &&  PreditctY > - (TableH / 2))
       {
           if (yp  > 0)
            this.roomArray[i].paddel2.y = yp - 0.04
       }

       this.wss.to(room.roomName).emit("player2moved" , {y  : this.roomArray[i].paddel2.y})
 }

 playerExist(client : any , login  : string)
 {

   for (let i = 0; i < this.roomArray.length; i++) {
     var room = this.roomArray[i];
     var player = room.getPlayerbyLogin(login )
     if (player)
       return  i;
   }

   return -1;
 }

 JoinPlayer(client : any , login : string)
 {
   var roomslenght = this.roomArray.length;

   if (this.roomArray[roomslenght - 1].roomPlayers.length === 2)
   {
     var roomName = this.roomArray[roomslenght - 1].roomName
     var lastRoomPlayers = this.roomArray[roomslenght - 1].roomPlayers
     this.roomArray[roomslenght - 1].status = "InGame"
     this.roomArray[roomslenght - 1].StartGame()

     this.wss.to(roomName).emit("startGame", {player1 : lastRoomPlayers[0].login , player2 :  lastRoomPlayers[1].login })
     this.wss.emit("change" , this.getArrayData() )

   }
 }

 getRoombyLogin(login : string )
 {
   for (let i = 0; i < this.roomArray.length; i++) {
     if (this.roomArray[i])
     {
       const element = this.roomArray[i].getPlayerbyLogin(login);
       if (element)
         return this.roomArray[i];
     }
   }
   return null
 }

 getRoombyPlayerId(id : string )
 {
   for (let i = 0; i < this.roomArray.length; i++) {
     if (this.roomArray[i])
     {
       const element = this.roomArray[i].getPlayer(id);
       if (element)
         return this.roomArray[i];
     }
   }
   return null
 }

 getRoombyName(name : string )
 {
   for (let i = 0; i < this.roomArray.length; i++) {

     if (this.roomArray[i].roomName === name)
         return i;
   }
   return -1
 }

 async RemovePlayer(client : any , login : string) 
 {
   for (let i = 0; i < this.roomArray.length; i++) {
     var room = this.roomArray[i];
     if (room)
     {

       var player = room.getPlayerbyLogin(login )
       if (room.roomPlayers.includes(player))
       { 
         this.wss.to(room.roomName).emit("endGame", {score: this.roomArray[i].score, roomPlayers :   this.roomArray[i].roomPlayers , status : this.roomArray[i].status})
         client.leave(room.roomName)
         this.roomArray.splice(i, 1)
         this.wss.emit("change" , this.getArrayData() )
         return ;
     }
     }
   }

 }


 AddtoRoomArray(client : any , login : string) {

   var roomslenght = this.roomArray.length;
   if (roomslenght === 0)
   {
     let myuuid = uuidv4();

     const  newRoom = new GameService(myuuid , this.wss)

   newRoom.joinPlayer(login , client.id)
   this.roomArray.push(newRoom)
   roomName = this.roomArray[roomslenght].roomName
 }
 else
 {
   roomName = this.roomArray[roomslenght - 1].roomName
   if ( this.roomArray[roomslenght - 1].status  === "waiting")
   {
     if (this.roomArray[roomslenght - 1].roomPlayers.length  < 2)
     {
       this.roomArray[roomslenght - 1].joinPlayer(login , client.id)
     }

   }
   else
   {
     let myuuid = uuidv4();
     const  newRoom = new GameService(myuuid , this.wss)
     newRoom.joinPlayer(login , client.id)
     this.roomArray.push(newRoom)
   }
 }
 var roomName = this.roomArray[this.roomArray.length - 1].roomName
 client.join(roomName)
  
 }

 getArrayData() {
  var l = [];
  for (let i = 0; i < this.roomArray.length; i++) {
    const element = this.roomArray[i];
    if (element)
    {
      if (element.status != "waiting")
      {
          if (element.roomPlayers[0] && element.roomPlayers[1]) {
            var test = { players :[element.roomPlayers[0].login ,element.roomPlayers[1].login ] , score : element.score , name : element.roomName}
            l.push(test)
          }
      }
    }
  }
  return l
}

playAi(client: any, payload: any): void {
  let myuuid = uuidv4();
  var newRoom = new GameService(myuuid , this.wss)
  newRoom.status = "AiGame"
  newRoom.direction = {x: 0.006 , y : 0.006}
  newRoom.joinPlayer(payload , client.id)
  newRoom.joinPlayer("drVegaPunk" , "drVegaPunk")
  client.join(newRoom.roomName)

  this.roomArray.push(newRoom)
  this.roomArray[this.roomArray.length - 1].StartGame()
  this.wss.to(newRoom.roomName).emit("startGame" , {player1 : payload , player2: "drVegaPunk"})
  this.wss.emit("change" , this.getArrayData() )
}
}