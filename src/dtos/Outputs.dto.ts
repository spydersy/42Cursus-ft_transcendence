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

// export class CurrentUser {
//     login:          string;
//     displayName:    string;
//     defaultAvatar:  string;
//     notifications:  any;
//     wins:           number;
//     losses:         number;
//     level:          number;
//     twoFactorAuth:  boolean;
// }

// export class demo {
// }