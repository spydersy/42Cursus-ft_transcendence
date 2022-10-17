import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MulterModule } from '@nestjs/platform-express';
import { ChatModule } from 'src/chat/chat.module';
import { TfaModule } from 'src/tfa/tfa.module';
import { TfaService } from 'src/tfa/tfa.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ProfileModule, ChatModule, TfaModule, MulterModule.register({
    dest: './upload',
  })],
  providers: [ProfileService, UserService, TfaService, ConfigService],
  controllers: [ProfileController],
  exports: [],
})
export class ProfileModule {}
