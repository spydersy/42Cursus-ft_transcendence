import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { TfaService } from 'src/tfa/tfa.service';
export declare class ProfileService {
    private userService;
    private prisma;
    private tfaService;
    constructor(userService: UserService, prisma: PrismaService, tfaService: TfaService);
    me(req: any, query: any, res: Response): Promise<Response<any, Record<string, any>>>;
    UploadAvatar(uploadedAvatart: string, userId: number, res: any): Promise<any>;
    UpdateUserName(newName: string, userId: number, res: any): Promise<any>;
    GetRequests(UserId: number, res: any): Promise<any>;
    GetFriends(UserId: number, res: any): Promise<any>;
    Logout(res: any): Promise<any>;
    Update2FA(me: number, status: string, res: any): Promise<any>;
    GetBlackList(UserId: number, res: any): Promise<any>;
}
