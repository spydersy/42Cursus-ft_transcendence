import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from './user.service';

@Module({
    imports: [ChatModule],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
