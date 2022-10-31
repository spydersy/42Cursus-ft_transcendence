import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';
import { TfaService } from 'src/tfa/tfa.service';

export const JWT_SECRET = process.env.JWT_SECRET;

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    PassportModule,
    UserModule,
    ConfigModule,
    ChatModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {expiresIn: '604800s'}
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, ChatService, TfaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
