import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileController } from './profile/profile.controller';
import { PrismaService } from './prisma/prisma.service';
import { SearchModule } from './search/search.module';
import { SearchService } from './search/search.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { TfaService } from './tfa/tfa.service';
import { TfaController } from './tfa/tfa.controller';
import { TfaModule } from './tfa/tfa.module';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { OnlineLogerGateway } from './online-loger.gateway';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { GameModule } from './game/game.module';
import { GameGateway } from './game.gateway'; 
import { NotifGateway } from './notif.gateway';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ProfileModule, ConfigModule.forRoot(), SearchModule, ChatModule, TfaModule, GameModule],
  controllers: [AppController, UserController, ProfileController, ChatController, TfaController, GameController],
  providers: [AppService, UserService, ProfileService, PrismaService, SearchService, ChatService, TfaService, ChatGateway, GameGateway, JwtService, OnlineLogerGateway, GameService, NotifGateway],
})
export class AppModule {}
