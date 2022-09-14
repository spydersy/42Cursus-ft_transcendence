import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ProfileModule, ConfigModule.forRoot()],
  controllers: [AppController, UserController, ProfileController],
  providers: [AppService, UserService, ProfileService],
})
export class AppModule {}
