import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { throws } from 'assert';
import { PlayerType } from '../dtos/Outputs.dto'


export class GameService {
    logger: Logger = new Logger('RoomLogger')
    roomlenght: number = 0;
    id: number = 0;
    roomMembers: string[] = []
    roomPlayers: PlayerType[] = [];
    roomName: string;
    score: {score1 : number , score2 : number};
    ball : {size : number,x : number , y  : number} 
    direction : {x : number , y  : number} 
    // score: {score1 : number , score2 : number};
   
   
   constructor(roomName : string)
   {
   //   this.logger.log("client is disconnected")
       this.roomName = roomName;
       this.score = {score1 : 0 , score2 : 0}
       this.ball = {size : 20 , x :  500 , y :350}
       this.direction = { x :  3 , y :3}
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
