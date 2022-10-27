import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Query, Response } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/dtos/User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {  
    constructor(private httpService: HttpService,
                private userService: UserService,
                private jwtTokenService: JwtService,
                private configService: ConfigService) {}

    Check42ApiQueryCode(@Query() query) : Boolean {
        if (query['error'] || !query['code']) {
            return false;
        }
        return true;
    }

    HandleSigninErrors(@Query() query) {
        console.log("// Do Something ...");
        return "// Do Something ...";
    }

    async ClaimToken(HeadersRequest) {
        return lastValueFrom(this.httpService
            .post(this.configService.get<string>('42API_TOKEN_ENDPOINT'), HeadersRequest)
            .pipe(map(res_ => {
                return (res_.data)
            }
            )));
    }

    async ClaimUserProfile(Token, code) {
        try {
            const HeadersRequest = {
                'Authorization': Token['token_type'] + ' ' + Token['access_token'],
                'clien_id': this.configService.get<string>('42API_CLIENT_ID'),
                'client_secret': this.configService.get<string>('42API_CLIENT_SECRET'),
                'code': code,
                'redirect_uri': this.configService.get<string>('AUTH_ENDPOINT'),
            };
            return await lastValueFrom(this.httpService
                .get(this.configService.get<string>('42API_PROFILE_ENDPOINT'), {headers: HeadersRequest}));
        }
        catch {
            console.log("__ERROR__WHILE__GETTING__USER__DATA__");
        }
    }

    async GetUserToken(code : String) {
        try {
            const HeadersRequest = {
                'grant_type': 'authorization_code',
                'client_id': this.configService.get<string>('42API_CLIENT_ID'),
                'client_secret': this.configService.get<string>('42API_CLIENT_SECRET'),
                'redirect_uri': this.configService.get<string>('AUTH_ENDPOINT'),
                'code': code,
            };
            const token = await this.ClaimToken(HeadersRequest);
            return token;
        }
        catch {
            console.log("__ERROR__ID__00");
        }
    }

    async GenerateJWT(user: User) {
        const payload = {Id: user.Id,
                        Login: user.Login,
                        TwoFactorAuth: user.TwoFactorAuth,
                        Email: user.Email
                    };
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }

    async SigninLogic(@Query() query, @Response() res: Res): Promise<any> {
        let UserDto: User;
        if (this.Check42ApiQueryCode(query) === true) {
            const Token = await this.GetUserToken(query['code']);
            const UserProfile = await this.ClaimUserProfile(Token, query['code']);
            UserDto =this.userService.GenerateUserDto(UserProfile['data']);
            if (await this.userService.FindUserById(UserDto.Id) === false) {
                this.userService.AddUserToDB(UserDto);
            }
            let JWT = await this.GenerateJWT(UserDto);
            if (UserDto.TwoFactorAuth === true) {
                res.
                set({
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
                    'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
                }).redirect(this.configService.get<string>('FRONTEND_2FA_URL'));
                // Do something ...
            }
            return res
                    .status(HttpStatus.OK).
                    set({
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
                        'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
                    })
                    .cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true})
                    .redirect(this.configService.get<string>('FRONTEND_URL'));
        }
        else {
            this.HandleSigninErrors(query);
        }
        return `Hello ${UserDto.UsualFullName}`;
    }
}
