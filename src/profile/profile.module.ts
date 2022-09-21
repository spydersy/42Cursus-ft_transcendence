import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule, ProfileModule, ChatModule],
  providers: [ProfileService, UserService, ],
  controllers: [ProfileController],
  exports: [],
})
export class ProfileModule {}
//ANAsmitimehdi147@@
