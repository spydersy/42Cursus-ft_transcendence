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
            if (await this.userService.UserExist(UserDto) === false) {
                this.userService.AddUserToDB(UserDto);
                let JWT = await this.GenerateJWT(UserDto);
                return res.cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true}).json({'message': 'DONE00'});
            }
            else {
                let JWT = await this.GenerateJWT(UserDto);
                return res.cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true}).json({'message': 'DONE01'});
            }
        }
        else {
            this.HandleSigninErrors(query);
        }
        return `Hello ${UserDto.UsualFullName}`; // redirect to HomePage [http://localhost:3000/]
    }
}
/*
__CURL__REQUEST__ :
__COOKIES__ :  {
  host: 'localhost:3000',
  'user-agent': 'curl/7.79.1',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NjI3MDAsIkxvZ2luIjoiYWJlbGFyaWYiLCJpYXQiOjE2NjIyMjAwNjksImV4cCI6MTY2MjgyNDg2OX0.ibeIf5T3R5Hr7TLweElwZxf6hRHxX_k4dagk3dJLg1k'
}
*/


/*
__BROWSER__REQUEST__ :
__COOKIES__ :  {
  host: 'localhost:3000',
  cookie: 'Authorization=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NjI3MDAsIkxvZ2luIjoiYWJlbGFyaWYiLCJpYXQiOjE2NjIyMjAwNjksImV4cCI6MTY2MjgyNDg2OX0.ibeIf5T3R5Hr7TLweElwZxf6hRHxX_k4dagk3dJLg1k',
}
*/

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NjI3MDAsIkxvZ2luIjoiYWJlbGFyaWYiLCJpYXQiOjE2NjIyOTQwMTcsImV4cCI6MTY2Mjg5ODgxN30.TyVVmo8-uVMxZupaiqXRJFcfu0l3fvlNeFIvmHRgX8w