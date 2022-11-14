import { Module, forwardRef } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule, forwardRef(() => ChatModule)],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}

