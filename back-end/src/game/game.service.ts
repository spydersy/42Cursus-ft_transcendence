import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { throws } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayerType } from '../dtos/Outputs.dto'
import { MODE } from '@prisma/client';
import { UserService } from 'src/user/user.service';

export class GameService {
    prisma: PrismaService
    userService: UserService
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
        this.userService = new UserService(this.prisma, null);
        this.roomName = roomName;
        this.score = {score1 : 0 , score2 : 0}
        this.ball = {size : 20 , x :  500 , y :350}
        this.direction = { x :  3 , y :3}
        this.status  = "waiting";
        this.paddel2 = {x : 1000 - 30 , y : 0}
        this.predict = 0;
        this.predicty = 0;
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
        await this.prisma.users.update({
            where: {id: player1Dto.id},
            data: {
                level: {
                    increment: this.score.score1 > this.score.score2 ? 100 : -50,
                }
            }
        });
        await this.prisma.users.update({
            where: {id: player2Dto.id},
            data: {
                level: {
                    increment: this.score.score2 > this.score.score1 ? 100 : -50,
                }
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

       for (let i = 0; i < this.roomPlayers.length; i++) {


           if ( this.roomPlayers[i].login === id )
           {
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

   async GetMatchHistory(me: number, param: string, @Res() res) {
        console.log("__PARAM__DBG__ : ", param);
        let History : any[] = [];
        if (param === 'all') {
            History = await this.prisma.matchHistory.findMany({
                include: {
                    player1: true,
                    player2: true,
                },
                orderBy: {date: 'desc'}
            });
        }
        else {
            const userDto = await this.userService.GetUserByLogin(param);
            if (userDto === null)
                return res.status(HttpStatus.NOT_FOUND).send({'message': 'User Not Found'});
            History = await this.prisma.matchHistory.findMany({
                where: {
                    OR: [
                        {player1Id: userDto.id},
                        {player2Id: userDto.id},
                    ],
                },
                include: {
                    player1: true,
                    player2: true,
                },
                orderBy: {date: 'desc'}
            },
            );
        }
        if (History.length !== 0) {
            History.forEach(game => {
                delete game.id;
                delete game.player1Id;
                delete game.player2Id;

                delete game.player1.id;
                delete game.player1.achievement;
                delete game.player1.wins;
                delete game.player1.losses;
                delete game.player1.level;
                delete game.player1.twoFactorAuth;
                delete game.player1.twoFactorAuthSecret;
                delete game.player1.lastModification;

                delete game.player2.id;
                delete game.player2.achievement;
                delete game.player2.wins;
                delete game.player2.losses;
                delete game.player2.level;
                delete game.player2.twoFactorAuth;
                delete game.player2.twoFactorAuthSecret;
                delete game.player2.lastModification;
            });
        }
        return res.status(HttpStatus.OK).send(History);
    }
}


