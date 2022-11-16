import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { throws } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayerType } from '../dtos/Outputs.dto'
import { MODE } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { Socket, Server } from 'socket.io';
import { SubscribeMessage, WebSocketGateway , OnGatewayInit , OnGatewayConnection , OnGatewayDisconnect , WebSocketServer } from '@nestjs/websockets';


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
    paddel1 : {x : number , y  : number}
    paddel2 : {x : number , y  : number}
    direction : {x : number , y  : number}
    status : string
    state : string
    predict : number
    predicty : number
    width : number
    height : number
    server : Server
    gameInter : any

    constructor(roomName : string , sv : Server)
    {
        this.prisma = new PrismaService();
        this.server = sv ;
        this.userService = new UserService(this.prisma, null);
        this.roomName = roomName;
        this.score = {score1 : 0 , score2 : 0}
        this.ball = {size : 0.02 , x :  0.5 , y :0.5}
        this.direction = { x :  0.005 , y :0.005}
        this.status  = "waiting";
        this.paddel2 = {x : 1 - 0.02  , y : 0.5}
        this.paddel1 = {x : 0.02  , y : 0.5}
        this.predict = 0;
        this.state = "PAUSE";
        this.predicty = 0;
    }

    StartGame()
    {
        this.gameInter = setInterval(this.loop, 1000/60 , this);
    }
    async Stop()
    {
        this.status = "ENDED"
        this.server.to(this.roomName).emit("endGame" , {score: this.score, roomPlayers :   this.roomPlayers , status : this.status })
        clearInterval(this.gameInter);
        await this.saveGame(this.status !== "AiGame" ?   MODE.CLASSIC :  MODE.AIBUGGY)

    }
    loop(game : GameService){
        if (game.state !== "PAUSE")
        {
            if(game.status === "AiGame" && game.direction.x > 0)
                game.moveAI()
            game.checkBallState()
            game.ball.x += game.direction.x
            game.ball.y += game.direction.y
            game.server.to(game.roomName).emit("moveBallClient" , {x: game.ball.x , y: game.ball.y , px : game.paddel2.x, py :game.predicty })
        }

    }
    checkBallState(){
        if (this.ball.x + this.direction.x > 1 - this.ball.size /2  )
        {
          this.incrementScore(1)
          this.server.to( this.roomName).emit("playerscored" ,  this.score)
    
          this.server.emit("changeScoreLive" , {name : this.roomName, score :this.score  })
          this.checkScore(this)
    
          return false
        }
        else if (this.ball.x + this.direction.x  <  this.ball.size /2  )
        {
          this.incrementScore(2)
          this.server.to( this.roomName).emit("playerscored" ,  this.score)
          this.server.emit("changeScoreLive" , {name : this.roomName, score :this.score  })
          this.checkScore(this)
    
          return false
    
    
        }
        else if (this.ball.y <= this.ball.size /2 || this.ball.y  >= 1 - this.ball.size /2 )
            this.direction.y = - this.direction.y
        else if (this.detectCollision(this.paddel1 , this.ball , this.direction , -0.02) || this.detectCollision(this.paddel2 , this.ball , this.direction , +0.02))
        {
            this.direction.x = ( -this.direction.x) * 1.05;
        }
        return true
    }

    detectCollision(player : any , ballCord : any , direction : any , flag : number) {
        const cx = ballCord.x + direction.x ;
        const cy = ballCord.y + direction.y;
        const r = flag/2  ;
        const [x1, y1, w1, h1] = [cx + r, cy - r, Math.abs(r * 2), Math.abs(r * 2)];
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
            this.Stop()
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
        for (let i = 0; i < this.roomPlayers.length; i++) {
            if ( this.roomPlayers[i].id === id )
            {
                return this.roomPlayers[i];
            }
        }
        return null
    }

    async addAchievement(player1: any, player2: any, mode: MODE) {
        let winner = this.score.score1 > this.score.score2 ? player1 : player2;
        let loser  = this.score.score1 > this.score.score2 ? player2 : player1;

        if (mode === MODE.AIBUGGY && winner.id !== 0) {
            winner.achievement[3] = true;
            await this.prisma.users.update({
                where: {
                    id: winner.id
                },
                data: {
                    achievement: winner.achievement
                }
            });
        }
        let winnerHistory =  await this.prisma.matchHistory.findMany({
            where: {
                OR: [
                    {player1Id: winner.id},
                    {player2Id: winner.id},
                ],
            },
        },
        );
        let loserHistory =  await this.prisma.matchHistory.findMany({
            where: {
                OR: [
                    {player1Id: loser.id},
                    {player2Id: loser.id},
                ],
            },
        },
        );
        if (winnerHistory.length == 2)
        {
            winner.achievement[4] = true;
            await this.prisma.users.update({
                where: {
                    id: winner.id
                },
                data: {
                    achievement: winner.achievement
                }
            });
        }
        if (loserHistory.length == 2)
        {
            loser.achievement[4] = true;
            await this.prisma.users.update({
                where: {
                    id: loser.id
                },
                data: {
                    achievement: loser.achievement
                }
            });
        }
    }

    async saveGame( mode: MODE) {
        if (this.roomPlayers[0] === null || this.roomPlayers[0] === undefined
            || this.roomPlayers[1] === null || this.roomPlayers[1] === undefined)
            return;
        let player1Dto = await this.prisma.users.findUnique({ where: { login: this.roomPlayers[0].login}}); 
        let player2Dto = await this.prisma.users.findUnique({ where: { login:   this.roomPlayers[1].login}});
        const gameIndex = mode == MODE.CLASSIC ? 0 : 1;

        player1Dto.wins[gameIndex] = this.score.score1 > this.score.score2
                                    ? player1Dto.wins[gameIndex] + 1
                                    : player1Dto.wins[gameIndex];

        player1Dto.losses[gameIndex] = this.score.score2 > this.score.score1
                                    ? player1Dto.losses[gameIndex] + 1
                                    : player1Dto.losses[gameIndex];


        player2Dto.wins[gameIndex] = this.score.score2 > this.score.score1
                                    ? player2Dto.wins[gameIndex] + 1
                                    : player2Dto.wins[gameIndex];

        player2Dto.losses[gameIndex] = this.score.score1 > this.score.score2
                                    ? player2Dto.losses[gameIndex] + 1
                                    : player2Dto.losses[gameIndex];


        await this.addAchievement(player1Dto, player2Dto, mode);
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
                },
                wins: player1Dto.wins,
                losses: player1Dto.losses,
            }
        });
        await this.prisma.users.update({
            where: {id: player2Dto.id},
            data: {
                level: {
                    increment: this.score.score2 > this.score.score1 ? 100 : -50,
                },
                wins: player2Dto.wins,
                losses: player2Dto.losses,
            }
        });
    }


    changeId(id : string , login : string)
    {
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
        this.ball = {size : 0.02 , x :  0.5 , y :0.5}
        this.direction = { x :  0.005 , y :0.005}
        if ( this.status === "AiGame")
            this.direction = {x: 0.005 , y : 0.005}
   }

   async GetMatchHistory(me: number, param: string, @Res() res) {
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


    moveAI()
    {
      const h =  0.15 ;
      var yp : number ;
      var yb : number ;
      var q = ( this.paddel2.x -  this.ball.x ) / this.direction.x
      yp =  this.paddel2.y;
      yb =  this.ball.y + this.direction.y;
      var PreditctY : number =  yb +( this.direction.y * q) -( h / 2);
       this.predicty = PreditctY
      var TableH : number =   1;
   
          if (PreditctY > 0 && PreditctY < TableH)
          {
            if (PreditctY >  yb && PreditctY < yb  + h)
              return ;
            else if (yp  > PreditctY)
               this.paddel2.y = yp - 0.04
            else if (yp + (h / 2) < PreditctY)
               this.paddel2.y = yp + 0.04
   
          }
          else if (PreditctY < TableH + (TableH / 2)  &&  PreditctY > TableH)
          {
              if (yp  + h < TableH  )
               this.paddel2.y = yp + 0.04
   
   
          }
          else if (PreditctY < 0  &&  PreditctY > - (TableH / 2))
          {
              if (yp  > 0)
               this.paddel2.y = yp - 0.04
          }
   
          this.server.to(this.roomName).emit("player2moved" , {y  : this.paddel2.y})
    }

}



