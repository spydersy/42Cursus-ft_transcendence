import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MulterModule } from '@nestjs/platform-express';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [PrismaModule, ProfileModule, ChatModule, MulterModule.register({
    dest: './upload',
  })],
  providers: [ProfileService, UserService, ],
  controllers: [ProfileController],
  exports: [],
})
export class ProfileModule {}
