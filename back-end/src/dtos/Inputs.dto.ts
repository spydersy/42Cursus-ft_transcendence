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

    @IsString()
    @IsNotEmpty()
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

export class JoinChannelDto {
    @IsUUID()
    @IsNotEmpty()
    channelId: string;

    @IsString()
    password: string;
}

export class UpdateChannelDto {
    @IsUUID()
    @IsNotEmpty()
    channelId: string;

    @IsString()
    @IsNotEmpty()
    newAccessType;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserRestrictionDto {
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
    duration: number;
}