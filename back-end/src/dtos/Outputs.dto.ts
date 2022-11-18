import { IsNotEmpty, IsString, Matches } from "class-validator";

export class Profile {
    @IsString()
    @IsNotEmpty()
    @Matches(/[a-zA-Z0-9_-]{4,10}/)

    Login:          string;

    Id:             number;

    UsualFullName:  string;
    Avatar:         string;
    Status:         string;
    Notifications:  any;
    Wins:           number;
    Losses:         number;
    Level:          number;
}

export interface PlayerType{
    id : string
    login : string,
}

export interface MsgPayload {
    channelId : string,
    content : string, 
    date : string, 
    displayName : string, 
    id : number,
    senderId : number
}
