import { AppService } from './app.service';
import { UserService } from './user/user.service';
declare const JwtAuthGuard_base: any;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export declare class AppController {
    private readonly appService;
    private userService;
    constructor(appService: AppService, userService: UserService);
    getHello(): string;
    profile(req: any): Promise<any>;
}
export {};
