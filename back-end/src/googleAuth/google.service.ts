import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Query, Response } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/dtos/User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TfaService } from 'src/tfa/tfa.service';
import { use } from 'passport';

@Injectable()
export class GoogleService {

  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
    private tfaService: TfaService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

  async GenerateGoogleLogin(id: number, user: any) {
    let login: string = "";

    login = user.firstName.slice(0, 3) + user.lastName;
    try {
      await this.prisma.users.create({
        data: {
          id: id,
          login: login,
          displayName: user.firstName + user.lastName,
          defaultAvatar: `https://myanimelist.tech/api/avatar?&name=${login}&animeName=One_Piece`,
        }
      });
    } catch {
      await this.prisma.users.create({
        data: {
          id: id,
          login: login + "_",
          displayName: user.firstName + user.lastName,
          defaultAvatar: `https://myanimelist.tech/api/avatar?&name=${login}&animeName=One_Piece`,
        }
      });
    }
  }

  async GenerateGoogleId(user: any) : Promise<number> {
    let nextId = 200000;
    const googleUsers = await this.prisma.users.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    if (googleUsers.length > 0 && googleUsers[0].id >= 200000)
    {
      nextId = googleUsers[0].id + 1;
    }
    return nextId;
  }

  async GoogleSigninLogic(user: any): Promise<any> {
    this.GenerateGoogleLogin(await this.GenerateGoogleId(user), user);
  } 
//     if (this.Check42ApiQueryCode(query) === true) {
//         const Token = await this.GetUserToken(query['code'], res);
//         const UserProfile = await this.ClaimUserProfile(Token, query['code'], res); //DONE
//         UserDto =this.userService.GenerateUserDto(UserProfile['data']); // skip(google)
//         // if (auht by google)
//         if (await this.userService.FindUserById(UserDto.Id) === false) { 
//         if (await this.userService.FindUserById(UserDto.Id) === false) { 
//             return this.firstSignin(UserDto, res);
//         }
//         const userDB = await this.userService.GetUserByLogin(UserDto.Login);
//         const JWT = await this.GenerateJwt(UserDto);
//         if (userDB.twoFactorAuth === true && userDB.twoFactorAuthSecret !== null) {                
//             const hashedKey = await this.Generate2faPublicKey(userDB.login);
//             res.
//             set({
//                 'Access-Control-Allow-Credentials': true,
//                 'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
//                 'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
//             })
//             .cookie('2FA_PUBLICKEY', hashedKey)
//             .redirect(this.configService.get<string>('FRONTEND_2FA_URL'));
//         }
//         else {
//             return res
//                     .status(HttpStatus.OK)
//                     .set({
//                         'Access-Control-Allow-Credentials': true,
//                         'Access-Control-Allow-Origin': this.configService.get<string>('FRONTEND_URL'),
//                         'Access-Control-Allow-Headers': this.configService.get<string>('FRONTEND_URL')
//                     })
//                     .cookie('Authorization', 'Bearer ' + JWT.access_token, {httpOnly: true})
//                     .redirect(this.configService.get<string>('FRONTEND_URL'));
//         }
//     }
//     else
//         return this.HandleSigninErrors(res);
// }

}

