import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
export declare class SearchService {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    FriendsSearch(userId: number, input: string, res: any): Promise<any>;
    AllUsersSearch(input: string, res: any): Promise<any>;
}
