import { ProfileService } from 'src/profile/profile.service';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    private profileService;
    constructor(userService: UserService, profileService: ProfileService);
    GetAllUsers(req: any, res: any): Promise<void>;
    GetUserByUsername(req: any, res: any): Promise<any>;
    GetFriends(req: any, res: any): Promise<any>;
    GetAchievements(req: any, res: any): Promise<any>;
    GetGames(req: any, res: any): Promise<any>;
    RelationsHandler(req: any, query: any, res: any): Promise<any>;
}
