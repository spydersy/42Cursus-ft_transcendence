import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';

@Module({
    imports: [ChatModule],
})
export class UserModule {
}
