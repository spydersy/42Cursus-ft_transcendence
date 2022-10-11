import { IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";

export class UserName {
    @IsString()
    @IsNotEmpty()
    @Matches(/[a-zA-Z0-9_-]{4,10}/)
    newname:   string;
}

export class MessageDataDto {
    @IsUUID()
    @IsNotEmpty()
    channelId: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
