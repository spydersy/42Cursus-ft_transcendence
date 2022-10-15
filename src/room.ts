import { Logger } from '@nestjs/common';

interface PlayerType{
    id : string
    login : string,
}
export class Room {
     logger: Logger = new Logger('RoomLogger')
     roomlenght: number = 0;
     id: number = 0;
     roomMembers: string[] = []
     roomPlayers: PlayerType[] = [];
     roomName: string;
    
    
    constructor(roomName : string)
    {
    //   this.logger.log("client is disconnected")
        this.roomName = roomName;
    }
    joinPlayer(login : string , id : string)
    {
        this.roomPlayers.push({login , id})
        
    }

    getPlayer(id : string)
    {
            console.log(this.roomPlayers.length)

        for (let i = 0; i < this.roomPlayers.length; i++) {
           
            if ( this.roomPlayers[i].id === id )
            {
                // console.log("found")
                return this.roomPlayers[i];
            }
            else
            {
                // console.log("Not found")
                return null
            }
        }

    }
    getPlayerbyLogin(id : string)

    {

        // console.log("room lenht " +this.roomPlayers.length)
        for (let i = 0; i < this.roomPlayers.length; i++) {
            console.log("loop " + this.roomPlayers[i].login)
            console.log("loop " + id)
           
            if ( this.roomPlayers[i].login === id )
            {
                console.log("found")
                return this.roomPlayers[i];
            }
            else
            {
                // console.log("Not found")



                return null
            }
        }

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