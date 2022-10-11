import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';

@Module({
    imports: [PrismaModule, forwardRef(() => UserModule)],
    providers: [ChatService, UserService],
    exports: [ChatService],
})
export class ChatModule {}
