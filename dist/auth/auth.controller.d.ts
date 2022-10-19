import { AuthService } from './auth.service';
import { Response as Res } from 'express';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    SigninLogic(query: any, res: Res): Promise<any>;
}
