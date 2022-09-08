import { HttpService } from '@nestjs/axios';
import { Injectable, Query, Response } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/dtos/User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response as Res } from 'express';

@Injectable()
export class AuthService {
    constructor(private httpService: HttpService,
                private userService: UserService,
                private jwtTokenService: JwtService) {}

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
            console.log("__ERROR__ID__00");
        }
    }

    async GenerateJWT(user: User) {
        const payload = {Id: user.Id, Login: user.Login};
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }

    async SigninLogic(@Query() query, @Response() res: Res): Promise<any> {
        let UserDto: User;
        if (this.Check42ApiQueryCode(query) === true) {
            const Token = await this.GetUserToken(query['code']);
            const UserProfile = await this.ClaimUserProfile(Token, query['code']);
            UserDto =this.userService.GenerateUserDto(UserProfile['data']);
            if (await this.userService.UserExist(UserDto.Login) === false) {
                this.userService.AddUserToDB(UserDto);
                let JWT = await this.GenerateJWT(UserDto);
                return res.cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true}).redirect("http://localhost:3001");
            }
            else {
                let JWT = await this.GenerateJWT(UserDto);
                return res.cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true}).redirect("http://localhost:3001");
            }
        }
        else {
            this.HandleSigninErrors(query);
        }
        return `Hello ${UserDto.UsualFullName}`; // redirect to HomePage [http://localhost:3000/]
    }
}
