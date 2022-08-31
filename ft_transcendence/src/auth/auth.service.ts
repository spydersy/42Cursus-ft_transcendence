import { HttpService } from '@nestjs/axios';
import { Injectable, Query } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private httpService: HttpService,
                private prisma: PrismaService,
                private jwtTokenService: JwtService) { }

    Check42ApiQueryCode(@Query() query) : Boolean {
        if (query['error'] || !query['code']) {
            return false;
        }
        return true;
    }

    HandleSigninErrors(@Query() query) {
        // Do Something ...
    }

    async ClaimToken(HeadersRequest) {
        return lastValueFrom(this.httpService
            .post('https://api.intra.42.fr/oauth/token', HeadersRequest)
            .pipe(map(res_ => {
                return (res_.data)
            }
            )));
    }

    async ClaimUserProfile(Token, code){
        try {
            const HeadersRequest = {
                'Authorization': Token['token_type'] + ' ' + Token['access_token'],
                'clien_id': 'b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20',
                'client_secret': '3b1dc5f372c8dd6e2c5763598c2ed5151a465bbc33f2527c6c819d70070b6e3a',
                'code': code,
                'redirect_uri': 'http://localhost:3000/auth',
            };
            return await lastValueFrom(this.httpService
                .get('https://api.intra.42.fr/v2/me', {headers: HeadersRequest}));
            }
        catch {
            console.log("__ERROR__WHILE__GETTING__USER__DATA__");
        }
    }

    async GetUserToken(code : String) {
        try {
            const HeadersRequest = {
                'grant_type': 'authorization_code',
                'client_id': 'b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20',
                'client_secret': '3b1dc5f372c8dd6e2c5763598c2ed5151a465bbc33f2527c6c819d70070b6e3a',
                'redirect_uri': 'http://localhost:3000/auth',
                'code': code,
            };
            const token = await this.ClaimToken(HeadersRequest);
            return token;
        }
        catch {
            console.log("__ERROR__OCCURED__");
        }
    }

    async UserExist(UserProfile: User) {
        // console.log(UserProfile.Login);
        let user = await this.prisma.users.findUnique({
            where: {
                Id: UserProfile.Id,
            },
        });
        console.log(user);
        if (user) {
            return true;
        }
        return false;
    }

    async AddUserToDB(UserProfile : User) {
        const user = await this.prisma.users.create({
            data: {
                Id: UserProfile.Id,
                Email: UserProfile.Email,
                Login: UserProfile.Login,
                UsualFullName: UserProfile.UsualFullName,
                DefaultAvatar: UserProfile.DefaultAvatar,
                UploadedAvatar: UserProfile.UploadedAvatar,
                Status: UserProfile.Status,
                Notifications: UserProfile.Notifications,
                Wins: UserProfile.Wins,
                Losses: UserProfile.Losses,
                Level: UserProfile.Level,
                TwoFactorAuth: false,
            },
        });
    }

    GenerateUserDto(UserProfile) : User {
        const user : User = {
            Id: UserProfile['id'],
            Email: UserProfile['email'],
            Login: UserProfile['login'],
            UsualFullName: UserProfile['usual_full_name'],
            DefaultAvatar: `https://avatars.dicebear.com/api/croodles-neutral/${UserProfile['login']}.svg`,
            UploadedAvatar: "",
            Status: "online",
            Notifications: {},
            Wins: 0,
            Losses: 0,
            Level: 0,
            TwoFactorAuth: false,
        }
        return user;
    }

    async GenerateJWT(user: User) {
        const payload = {Id: user.Id, Login: user.Login};
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }

    async SigninLogic(@Query() query): Promise<string> {
        let UserDto: User;
        if (this.Check42ApiQueryCode(query) === true) {
            const Token = await this.GetUserToken(query['code']);
            const UserProfile = await this.ClaimUserProfile(Token, query['code']);
            UserDto =this.GenerateUserDto(UserProfile['data']);
            if (await this.UserExist(UserDto) === false) {
                this.AddUserToDB(UserDto);
                // let ret00 = await this.GenerateJWT(UserDto)
                // console.log("__JSON__WEB__TOKEN__ : ", ret00);
            }
            else {
                // Destroy Old JWT Then Set New One
                return "User Already Exist";
            }
        }
        else {
            this.HandleSigninErrors(query);
        }
        return `Hello ${UserDto.UsualFullName}`; // redirect to HomePage [http://localhost:3000/]
    }
}
