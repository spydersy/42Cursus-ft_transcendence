import { Module } from '@nestjs/common';

import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [],
  controllers: [AlertController],
  providers: [ AlertGateway, ChatGateway],
})
export class AppModule {}
