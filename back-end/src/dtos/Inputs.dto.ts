import { ConfigService } from "@nestjs/config";
import { IsNotEmpty,
        IsNumber,
        IsString,
        IsUUID,
        Matches,
        MinLength,
        MaxLength } from "class-validator";

export class UserNameDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/[a-zA-Z0-9_-]{4,10}/)
    newname:   string;
}

export class ChannelData {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @MinLength(2)
    members: string;

    password: string;
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

export class UserRestrictionDto{
    @IsUUID()
    @IsNotEmpty()
    channelId: string;

    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    restriction: string;

    @IsNumber()
    duration: number; // 1min(60s), 5min(300s), 10min(600s), 30min(1800s), 60min(3600s), 1day(86400s)
}