import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Query, Response } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/dtos/User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TfaService } from 'src/tfa/tfa.service';

@Injectable()
export class AuthService {
    constructor(private httpService: HttpService,
                private userService: UserService,
                private jwtTokenService: JwtService,
                private configService: ConfigService,
                private prisma: PrismaService,
                private tfaService: TfaService) {}

    Check42ApiQueryCode(@Query() query) : Boolean {
        if (query['error'] || query['code'] === null
            || query['code'] === undefined) {
            return false;
        }
        return true;
    }

    HandleSigninErrors(@Response() res) {
        return res.redirect(this.configService.get<string>('SIGNIN_FRONTEND_URL'));
    }

    async ClaimToken(HeadersRequest) {
        return lastValueFrom(this.httpService
            .post(this.configService.get<string>('42API_TOKEN_ENDPOINT'), HeadersRequest)
            .pipe(map(res_ => {
                return (res_.data)
            }
            )));
    }

    async ClaimUserProfile(Token, code, @Response() res) {
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
            return this.HandleSigninErrors(res);
        }
    }

    async GetUserToken(code : String, @Response() res) {
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
            return this.HandleSigninErrors(res);
        }
    }

    async GenerateJwt(user: User) {
        const payload = {Id: user.Id,
                        Login: user.Login,
                        TwoFactorAuth: user.TwoFactorAuth,
                    };
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }
    
    async GenerateJwt2FA(user: any) {
        const payload = {Id: user.Id,
                        Login: user.Login,
                        TwoFactorAuth: user.TwoFactorAuth,
                    };
        return { access_token: this.jwtTokenService.sign(payload),
        };
    }

    async firstSignin(UserDto: User, @Response() res) {
        this.userService.AddUserToDB(UserDto);
        const JWT = await this.GenerateJwt(UserDto);
        res.
        set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
            'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
        })
        .cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true})
        .redirect(this.configService.get<string>('SETTINGS_FRONTEND_URL'));
    }
    async Generate2faPublicKey(login: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(login, saltOrRounds);
        return hash + "_-_" + login;
    }

    async SigninLogic(@Query() query, @Response() res: Res): Promise<any> {
        let UserDto: User;
        if (this.Check42ApiQueryCode(query) === true) {
            const Token = await this.GetUserToken(query['code'], res);
            const UserProfile = await this.ClaimUserProfile(Token, query['code'], res);
            UserDto =this.userService.GenerateUserDto(UserProfile['data']);
            if (await this.userService.FindUserById(UserDto.Id) === false) {
                return this.firstSignin(UserDto, res);
            }
            const userDB = await this.userService.GetUserByLogin(UserDto.Login);
            const JWT = await this.GenerateJwt(UserDto);
            if (userDB.twoFactorAuth === true && userDB.twoFactorAuthSecret !== null) {                
                const hashedKey = await this.Generate2faPublicKey(userDB.login);
                res.
                set({
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
                    'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
                })
                .cookie('2FA_PUBLICKEY', hashedKey)
                .redirect(this.configService.get<string>('FRONTEND_2FA_URL'));
            }
            else {
                return res
                        .status(HttpStatus.OK)
                        .set({
                            'Access-Control-Allow-Credentials': true,
                            'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
                            'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
                        })
                        .cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true})
                        .redirect(this.configService.get<string>('FRONTEND_URL'));
            }
        }
        else
            return this.HandleSigninErrors(res);
    }

    async TFAVerificationRes(publicKey: string, code: string, @Response() res) {
        const hash = publicKey.split('_-_');
        if (hash.length !== 2 || await bcrypt.compare(hash[1], hash[0]) === false)
            return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Key'});
        const user = await this.prisma.users.findUnique({
            where: {login: hash[1]}
        });
        if (user === null) 
            return res.status(HttpStatus.BAD_REQUEST).send({'message': 'User Not Found'});
        if (await this.tfaService.TFAVerification(user.id, code) === true) {
            const JWT = await this.GenerateJwt2FA({
                Id: user.id,
                Login: user.login,
                TwoFactorAuth: user.twoFactorAuth,
            });
            res.status(HttpStatus.OK)
            .clearCookie('2FA_PUBLICKEY')
            .cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true})
            .send({'Authentication': 'SUCCESS'});
        }
        else
            return res.status(HttpStatus.OK).send({'Authentication': 'REFUSED'});
    }
}
