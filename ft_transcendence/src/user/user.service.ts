import { Injectable } from '@nestjs/common';
import { User } from 'src/dtos/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}
    GenerateUserDto(UserProfile) : User {
        const user : User = {
            Id: UserProfile['id'],
            Email: UserProfile['email'],
            Login: UserProfile['login'],
            UsualFullName: UserProfile['usual_full_name'],
            DefaultAvatar: `https://avatars.dicebear.com/api/croodles-neutral/${UserProfile['login']}.svg`,
            UploadedAvatar: "",
            Status: "online",
            Notifications: {},
            Wins: 0,
            Losses: 0,
            Level: 0,
            TwoFactorAuth: false,
        }
        return user;
    }

    async AddUserToDB(UserProfile : User) {
        const user = await this.prisma.users.create({
            data: {
                Id: UserProfile.Id,
                Email: UserProfile.Email,
                Login: UserProfile.Login,
                UsualFullName: UserProfile.UsualFullName,
                DefaultAvatar: UserProfile.DefaultAvatar,
                UploadedAvatar: UserProfile.UploadedAvatar,
                Status: UserProfile.Status,
                Notifications: UserProfile.Notifications,
                Wins: UserProfile.Wins,
                Losses: UserProfile.Losses,
                Level: UserProfile.Level,
                TwoFactorAuth: false,
            },
        });
    }

   async    GetUser(username: string) : Promise<any> {
    let user = await this.prisma.users.findUnique({
        where: {
            Login: username,
        },
    });
    return user;
   }

    async UserExist(UserProfile: User) {
        let user = await this.prisma.users.findUnique({
            where: {
                Id: UserProfile.Id,
            },
        });
        if (user) {
            return true;
        }
        return false;
    }
}
