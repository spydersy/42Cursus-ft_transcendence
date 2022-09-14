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

/*
{
    "Id":62700,
    "Login":"abelarif",
    "UsualFullName":"Achraf Belarif",
    "Avatar":"https://avatars.dicebear.com/api/croodles-neutral/abelarif.svg",
    "Status":"online",
    "Notifications":{},
    "Wins":0,
    "Losses":0,
    "Level":0,
}
*/