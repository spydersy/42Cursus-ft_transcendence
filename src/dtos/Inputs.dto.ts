import { IsNotEmpty, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class UserNameDto {
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
    @MaxLength(300)
    content: string;
}

export class ChannelUserDto {
    @IsUUID()
    @IsNotEmpty()
    channelId: string;

    @IsString()
    @IsNotEmpty()
    user: string;
}
