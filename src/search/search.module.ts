import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  providers: [SearchService, PrismaService, UserService],
  controllers: [SearchController],
})
export class SearchModule {}
