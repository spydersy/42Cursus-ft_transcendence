import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule, ProfileModule],
  providers: [ProfileService, UserService],
  controllers: [ProfileController],
  exports: [],
})
export class ProfileModule {}
//ANAsmitimehdi147@@
