import { Logger } from '@nestjs/common';


export class Room {
     logger: Logger = new Logger('RoomLogger')
     roomlenght: number = 0;
     id: number = 0;
     roomMembers: string[] = []
    
    
    constructor(data: any)
    {
    //   this.logger.log("client is disconnected")
  
    }
  
  
}