import { HttpService } from '@nestjs/axios';
import { User } from 'src/dtos/User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response as Res } from 'express';
export declare class AuthService {
    private httpService;
    private userService;
    private jwtTokenService;
    constructor(httpService: HttpService, userService: UserService, jwtTokenService: JwtService);
    Check42ApiQueryCode(query: any): Boolean;
    HandleSigninErrors(query: any): string;
    ClaimToken(HeadersRequest: any): Promise<unknown>;
    ClaimUserProfile(Token: any, code: any): Promise<unknown>;
    GetUserToken(code: String): Promise<unknown>;
    GenerateJWT(user: User): Promise<{
        access_token: any;
    }>;
    SigninLogic(query: any, res: Res): Promise<any>;
}
