import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UserName {
    @IsString()
    @IsNotEmpty()
    @Matches(/[a-zA-Z0-9_-]{4,10}/)
    UserName:   string;
}
