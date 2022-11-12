import { SubscribeMessage, WebSocketGateway , OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect , WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger , UseGuards } from '@nestjs/common';
import { get } from 'http';
import { Controller, Get } from '@nestjs/common';
import { start } from 'repl';
import { GameService } from './game/game.service';
import { WsGuard } from './auth/jwt.strategy';
import { MODE } from '@prisma/client';
import {v4 as uuidv4} from 'uuid';
import { emit } from 'process';

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
  private roomArray: GameService[] = [];//Room[] = []



  afterInit(server: any) {
    this.logger.log("After Init")
    // console.log( server.adapter.rooms)
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
    console.log("___DBG@")
    var roomslenght = this.roomArray.length;

    if (this.roomArray[roomslenght - 1].roomPlayers.length === 2)
    {
      var roomName = this.roomArray[roomslenght - 1].roomName
      var lastRoomPlayers = this.roomArray[roomslenght - 1].roomPlayers
      this.roomArray[roomslenght - 1].status = "InGame"
      console.log("___DBG@")

      this.logger.log("startgame emited")
      this.wss.to(roomName).emit("startGame", {player1 : lastRoomPlayers[0].login , player2 :  lastRoomPlayers[1].login })
      this.wss.emit("change" , this.getArrayData() )

      this.logger.log("startgame emited")
    }
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

  RemovePlayer(client : any , login : string)
  {
    console.log("remove : " + login)
    for (let i = 0; i < this.roomArray.length; i++) {
      var room = this.roomArray[i];
      if (room)
      {

        var player = room.getPlayerbyLogin(login )
        console.log(player)
        if (room.roomPlayers.includes(player))
        {
          console.log("remove : " +room.roomName)
  
          this.wss.to(room.roomName).emit("endGame", {score: this.roomArray[i].score, roomPlayers :   this.roomArray[i].roomPlayers})
          client.leave(room.roomName)
          // room.roomPlayers.splice(0, 2);
          this.roomArray.splice(i, 1)
          this.wss.emit("change" , this.getArrayData() )
  
          return ;
      }
      }
    }

  }


  AddtoRoomArray(client : any , login : string) {

    var roomslenght = this.roomArray.length;
    console.log("__DBG__ADTOROOMS :",roomslenght )
    if (roomslenght === 0)
    {
      let myuuid = uuidv4();

      const  newRoom = new GameService(myuuid)

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
      const  newRoom = new GameService(myuuid)
      newRoom.joinPlayer(login , client.id)
      this.roomArray.push(newRoom)
    }
  }
  var roomName = this.roomArray[this.roomArray.length - 1].roomName
  client.join(roomName)
    // this.wss.emit("change" ,  this.roomArray)
    this.logger.log("changeee")
    for (let index = 0; index < this.roomArray.length; index++) {
      this.roomArray[index].debug();
   }

  }


  // @UseGuards(WsGuard)
  handleDisconnect(client: any)
  {
    this.logger.log("client is disconnected")
    this.RemovePlayer(client , client.id)
    for (let index = 0; index < this.roomArray.length; index++) {
      this.roomArray[index].debug();
   }
  }


  // @UseGuards(WsGuard)
  handleConnection(client: any, payload: any): void {

    this.logger.log("client is connected "  + client.id)

  }

  @SubscribeMessage('endGame')
  deleteRoom(client: any, payload: any): void {

    this.logger.log("client is disconnected")
    var room = this.getRoombyPlayerId(client.id)
    if (room !== null)
    {
      this.wss.to(room.roomName).emit("endGame" , {score: room.score, roomPlayers :   room.roomPlayers})
      this.wss.emit("change" , this.getArrayData() )
      this.RemovePlayer(client , payload)
      // this.wss.emit("change" ,  this.roomArray)
    }

    
    for (let index = 0; index < this.roomArray.length; index++) {
      this.roomArray[index].debug();

  }
}
  @SubscribeMessage('gameChallenge')
  gameChallenge(client: any, payload: {player1 : string ,player2 : string }): void {


      this.logger.log("challengeGame" , payload)
  if (this.getRoombyName(payload.player1+payload.player2) === -1)
  {
    var newRoom = new GameService(payload.player1+payload.player2)
    newRoom.joinPlayer(payload.player1 , client.id)
    client.join(newRoom.roomName)
    this.roomArray.push(newRoom)
    this.roomArray[this.roomArray.length - 1].debug()

  }


  }
  @SubscribeMessage('gameAccept')
  gameAccept(client: any, payload: {player1 : string ,player2 : string }): void {


      var i = this.getRoombyName(payload.player1 + payload.player2)
      this.logger.log("gameAccept" , i)

      if (i !== -1)
      {
        this.logger.log("gameAccept" , i)
        client.join(this.roomArray[i].roomName)

        this.wss.to(this.roomArray[i].roomName).emit("challengeAccepted")
        this.roomArray[i].joinPlayer(payload.player2 , client.id)

        this.roomArray[i].debug()
        // this.wss.to(this.roomArray[i].roomName).emit("startGame" , payload)
      }



  }
  @SubscribeMessage('start')
  start(client: any, payload: string): void {



      var room = this.getRoombyPlayerId(client.id)


      if (room != null)
      {
        client.join(room.roomName)
        var i = this.roomArray.indexOf(room)
        // this.roomArray[i].roomPlayers.
        if (this.roomArray[i].roomPlayers.length === 2)
        {
          this.roomArray[i].status = "InGame";
          this.wss.to(this.roomArray[i].roomName).emit("startGame" , {player1: this.roomArray[i].roomPlayers[0].login , player2: this.roomArray[i].roomPlayers[1].login})


          this.wss.emit("change" , this.getArrayData() )
        }

      }





  }
  getArrayData() {
    var l = [];
    for (let i = 0; i < this.roomArray.length; i++) {
      const element = this.roomArray[i];
      if (element)
      {
        if (element.status != "waiting")
        {

          var test = { players :[element.roomPlayers[0].login ,element.roomPlayers[1].login ] , score : element.score , name : element.roomName}
            l.push(test)
        }
      }
    }
    return l
  }



  @SubscribeMessage('getLiveGames')
  getLive(client: any): void {
    client.emit("change" , this.getArrayData() )

  }



  @SubscribeMessage('playerConnect')
    playerConnect(client: any, login: any): void {
    this.logger.log("player connected:  "  + client.id + " : " + login)

    var index = this.playerExist(client , login)
    if (index === -1)
    {
      this.AddtoRoomArray(client , login)
      this.JoinPlayer(client , login)
      for (let index = 0; index < this.roomArray.length; index++) {
         this.roomArray[index].debug();

      }
    }
    else
    {
       this.roomArray[index].changeId(client.id , login)
    }

  }

  
  @SubscribeMessage('watchGame')
  addWatch(client: any, payload: any): void {
    var i = this.getRoombyName(payload)
    console.log("WATCHH___GAAME :: ", i)
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

  @SubscribeMessage('moveBall')
  moveBall(client: any, payload: any): void {
    var room = this.getRoombyPlayerId(client.id)
    if (room)
    {
      var i = this.roomArray.indexOf(room)
      this.roomArray[i].width = payload.w
      this.roomArray[i].height = payload.h
      this.roomArray[i].paddel2.x = payload.w - 30
      if (!this.hitWalls(i, this.roomArray[i].ball ,this.roomArray[i].direction , payload.w, payload.h ,payload.p1 , payload.p2 ))
        return ;
      this.roomArray[i].predict =  (this.roomArray[i].paddel2.x -  this.roomArray[i].ball.x) / this.roomArray[i].direction.x
       this.roomArray[i].ball.x += this.roomArray[i].direction.x
      this.roomArray[i].ball.y += this.roomArray[i].direction.y

      if(room.status === "AiGame" && room.direction.x > 0)
      {
          this.moveAI( this.roomArray[i])
      }
      this.wss.to(room.roomName).emit("moveBallClient" , {x: this.roomArray[i].ball.x , y: this.roomArray[i].ball.y , px : this.roomArray[i].paddel2.x, py :this.roomArray[i].predicty })
    }



  }


  @SubscribeMessage('PlayAi')
  playAi(client: any, payload: any): void {
    let myuuid = uuidv4();
    var ret  = this.playerExist(client , payload);

    // console.log("__PLAYAI___DBG: ", newRoom.roomPlayers)
    for (let index = 0; index < this.roomArray.length; index++) {
      this.roomArray[index].debug();

   }


    // if (ret === -1)
    // {
      var newRoom = new GameService(myuuid)
      newRoom.status = "AiGame"
      newRoom.joinPlayer(payload , client.id)
      newRoom.joinPlayer("drVegaPunk" , "drVegaPunk")
      console.log("__PLAYAI___DBG: ", newRoom.roomPlayers)
      client.join(newRoom.roomName)
      this.roomArray.push(newRoom)
      this.wss.to(newRoom.roomName).emit("startGame" , {player1 : payload , player2: "drVegaPunk"})
      this.wss.emit("change" , this.getArrayData() )

    // }
    for (let index = 0; index < this.roomArray.length; index++) {
      this.roomArray[index].debug();

   }




  }
   hitWalls = (i : number,ballCord : any ,direction: any , width , height  ,paddel1 : any , paddel2 : any, )=>{

    if (ballCord.x + direction.x > width - (ballCord.size  /2 ))
    {
      this.roomArray[i].incrementScore(1)
      this.wss.to( this.roomArray[i].roomName).emit("playerscored" ,  this.roomArray[i].score)
      console.log("Room : " , i)
      this.wss.emit("changeScoreLive" , {index : i , score :this.roomArray[i].score  })
      this.checkScore(this.roomArray[i])

      return false
    }
    else if (ballCord.x + direction.x  < ( ballCord.size /2)    )
    {
      this.roomArray[i].incrementScore(2)
      this.wss.to( this.roomArray[i].roomName).emit("playerscored" ,  this.roomArray[i].score)
      console.log("Room : " , i)
      this.wss.emit("changeScoreLive" , {index : i , score :this.roomArray[i].score  })
      this.checkScore(this.roomArray[i])

      return false


    }
    else if (ballCord.y <=  ballCord.size / 2 || ballCord.y  >= height - ballCord.size / 2 )
        this.roomArray[i].direction.y = -this.roomArray[i].direction.y
    else if (this.detectCollision(paddel1 , ballCord , this.roomArray[i].direction) || this.detectCollision(paddel2 , ballCord , this.roomArray[i].direction))
    {
        this.roomArray[i].direction.x =( -this.roomArray[i].direction.x) * 1.15;
    }
    return true

  }


   detectCollision(player : any , ballCord : any , direction : any) {
    const cx = ballCord.x + direction.x ;
    const cy = ballCord.y + direction.y;
    const r = ballCord.size / 2 ;
    const [x1, y1, w1, h1] = [cx - r, cy - r, r * 2, r * 2];
    const x2 =player.x ;
    const y2 =player.y;
    const w2 = parseInt(player.w);
    const h2 = parseInt(player.h);

    const colliding = x1 < (x2 + w2) && (x1 + w1) > x2 &&
    y1 < (y2 + h2) && (y1 + h1) > y2;
    return colliding;

}
async checkScore (room : any) {
    //you can do better
    // console.log(Math.abs(room.score.score1 - room.score.score2))
    console.log("__ROOM__DBG__ : ", room);
    if (room.score.score1 + room.score.score2  >= 3)
    {
      var i = this.roomArray.indexOf(room)

      this.wss.to(this.roomArray[i].roomName).emit("endGame" , {score: this.roomArray[i].score, roomPlayers :   this.roomArray[i].roomPlayers})

      await this.roomArray[i].saveGame(MODE.AIBUGGY)
      this.roomArray.splice(i, 1)
      console.log(this.roomArray)
    }
}



moveAI(room : any )
 {
  var i = this.roomArray.indexOf(room)
   const h =  100;
   var yp : number ;
   var yb : number ;
   var q = ( room.paddel2.x -  room.ball.x ) / room.direction.x
   yp =  room.paddel2.y;
   yb =  room.ball.y + room.direction.y;
   var PreditctY : number =  yb +( room.direction.y * q) -( h / 2);
    this.roomArray[i].predicty = PreditctY
   var TableH : number =   700;


       if (PreditctY > 0 && PreditctY < TableH)
       {
         if (PreditctY >  yb && PreditctY < yb  + h)
           return ;
         else if (yp  > PreditctY)
            this.roomArray[i].paddel2.y = yp - 10
         else if (yp + (h / 2) < PreditctY)
            this.roomArray[i].paddel2.y = yp + 10

       }
       else if (PreditctY < TableH + (TableH / 2)  &&  PreditctY > TableH)
       {
           if (yp  + h < TableH)
            this.roomArray[i].paddel2.y = yp + 10


       }
       else if (PreditctY < 0  &&  PreditctY > - (TableH / 2))
       {
           if (yp  > 0)
            this.roomArray[i].paddel2.y = yp - 10
       }

       this.wss.to(room.roomName).emit("player2moved" , this.roomArray[i].paddel2.y)
 }
}