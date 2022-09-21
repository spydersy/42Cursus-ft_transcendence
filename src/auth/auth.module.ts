import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    PassportModule,
    UserModule,
    ConfigModule,
    ChatModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '604800s'}
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
