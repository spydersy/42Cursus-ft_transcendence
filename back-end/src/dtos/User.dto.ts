import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class User {
    @IsNumber()
    Id:                 number;

    Email:              string;

    @IsString()
    @IsNotEmpty()
    Login:              string;

    @IsString()
    @IsNotEmpty()
    UsualFullName:      string;

    @IsString()
    @IsNotEmpty()
    DefaultAvatar:      string;

    @IsString()
    UploadedAvatar:     string;


    @IsString()
    @IsNotEmpty()
    Status:             string;

    Notifications:      any;

    @IsNumber()
    Wins:               number;

    @IsNumber()
    Losses:             number;

    @IsNumber()
    Level:              number;

    TwoFactorAuth:    Boolean;
}
