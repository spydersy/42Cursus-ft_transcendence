import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    GenerateUserDto(UserProfile: any): User;
    AddUserToDB(UserProfile: User): Promise<void>;
    GetUser(username: string): Promise<any>;
    UserExist(UserProfile: User): Promise<boolean>;
}
