import { Injectable, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { throws } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayerType } from '../dtos/Outputs.dto'
import { MODE } from '@prisma/client';

export class GameService {
    prisma: PrismaService
    logger: Logger = new Logger('RoomLogger')
    roomlenght: number = 0;
    id: number = 0;
    roomMembers: string[] = []
    roomPlayers: PlayerType[] = [];
    roomName: string;
    score: {score1 : number , score2 : number};
    ball : {size : number,x : number , y  : number}
    paddel2 : {x : number , y  : number}
    direction : {x : number , y  : number}
    status : string
    predict : number
    predicty : number
    // score: {score1 : number , score2 : number};


   constructor(roomName : string)
   {
   //   this.logger.log("client is disconnected")
       this.prisma = new PrismaService();
       this.roomName = roomName;
       this.score = {score1 : 0 , score2 : 0}
       this.ball = {size : 20 , x :  500 , y :350}
       this.direction = { x :  3 , y :3}
       this.status  = "waiting";
       this.paddel2 = {x : 1000 - 30 , y : 0}
       this.predict = 0;
       this.predicty = 0;

   }

   async GetMatchHistory(me: number, param: string, @Res() res) {
        // if (param === 'all') {
        //     t
        // }
   }

   joinPlayer(login : string , id : string)
   {
    if ( this.roomPlayers.length < 2)
    {
        this.roomPlayers.push({login , id})
    }

   }


   
   getPlayer(id : string)
   {

        //    console.log("players number : " , this.roomPlayers.length)
       for (let i = 0; i < this.roomPlayers.length; i++) {

        //    console.log(this.roomPlayers[i].id + " " + id )
           if ( this.roomPlayers[i].id === id )
           {
               // console.log("found")
               return this.roomPlayers[i];
           }
       }
       return null
   }

   async saveGame( mode: MODE) {
        const player1Dto = await this.prisma.users.findUnique({ where: { login: this.roomPlayers[0].login}});
        const player2Dto = await this.prisma.users.findUnique({ where: { login:   this.roomPlayers[1].login}});

        await this.prisma.matchHistory.create({
            data: {
                player1Id: player1Dto.id,
                player2Id: player2Dto.id,
                score1: this.score.score1,
                score2: this.score.score2,
                mode: mode,
            }
        });
   }
   

   changeId(id : string , login : string)
   {

        //    console.log("players number : " , this.roomPlayers.length)
       for (let i = 0; i < this.roomPlayers.length; i++) {

           if ( this.roomPlayers[i].login === login )
           {

               this.roomPlayers[i].id = id
           }
       }

   }

   getPlayerbyLogin(id : string)
   {

       console.log("room lenht " +this.roomPlayers.length)
       for (let i = 0; i < this.roomPlayers.length; i++) {
           console.log("loop " + this.roomPlayers[i].login)
           console.log("loop " + id)

           if ( this.roomPlayers[i].login === id )
           {
               console.log("found")
               return this.roomPlayers[i];
           }
       }
       return null

   }
   incrementScore(id : number)
   {
        if (id == 1)
            this.score.score1++;
        else
            this.score.score2++;
        this.ball = {size : 35 , x :  500 , y :350}
        this.direction = { x :  3 , y :3}
   }


   debug()
   {
       console.log("roomName : " +  this.roomName )
       console.log("roomlenght : " +  this.roomlenght )
       console.log("roomPlayers  : {" )
       for (let index = 0; index < this.roomPlayers.length; index++) {

           console.log("id : " +  this.roomPlayers[index].id )
           console.log("login : " +  this.roomPlayers[index].login )

       }
       console.log("}" )

   }
}
