import { HttpService } from '@nestjs/axios';
import { User } from 'src/dtos/User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private httpService;
    private userService;
    private jwtTokenService;
    private configService;
    constructor(httpService: HttpService, userService: UserService, jwtTokenService: JwtService, configService: ConfigService);
    Check42ApiQueryCode(query: any): Boolean;
    HandleSigninErrors(query: any): string;
    ClaimToken(HeadersRequest: any): Promise<any>;
    ClaimUserProfile(Token: any, code: any): Promise<import("axios").AxiosResponse<any, any>>;
    GetUserToken(code: String): Promise<any>;
    GenerateJWT(user: User): Promise<{
        access_token: string;
    }>;
    SigninLogic(query: any, res: Res): Promise<any>;
}
