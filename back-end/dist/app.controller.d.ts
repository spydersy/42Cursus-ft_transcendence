import { AppService } from './app.service';
import { UserService } from './user/user.service';
export declare class AppController {
    private readonly appService;
    private userService;
    constructor(appService: AppService, userService: UserService);
    getUploadedFile(image: any, res: any): Promise<void>;
}
