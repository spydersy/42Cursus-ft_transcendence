import { Controller, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';
import { fileURLToPath } from 'url';
import { query } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {

    @Post('createRoom')
    @UseInterceptors(
        FileInterceptor('avatar', {
          storage: diskStorage({
            destination: './upload',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
        }),
    )
    async CreateRoom(@Req() req, @UploadedFile() fileURLToPath,
    @Query() query, @Res() res) {
        
    }

}
