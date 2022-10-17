import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private profileService;
    private userService;
    constructor(profileService: ProfileService, userService: UserService);
    GetUserProfile(req: any, query: any, res: Response): Promise<any>;
    UpdateAvatar(req: any, file: any, res: any): Promise<any>;
    Logout(res: any): Promise<any>;
    Update2FA(req: any, status: any, res: any): Promise<any>;
    UpdateUserName(req: any, newname: string, res: any): Promise<any>;
}
