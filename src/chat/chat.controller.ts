import { Controller, HttpStatus, Post, Get, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';
import { fileURLToPath } from 'url';
import { query } from 'express';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {}

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
    async CreateRoom(@Req() req, @UploadedFile() file,
    @Query() query, @Res() res) {
      console.log("__NAME__DBG__    : ", query['name']);
      console.log("__TYPE__DBG__    : ", query['type']);
      console.log("__MEMBERS__DBG__ : ", query['members']);

      const ChannelIcone = `http://localhost:8000/upload/${file.filename}`;
      if (query['name'] !== undefined
          && query['type'] !== undefined
          &&  query['members'] !== undefined)
      {
        if (query['type'] === 'protected' && query['password'] === undefined)
          return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
        if (query['type'] === 'protected' && query['password'] !== undefined)
          return this.chatService.CreateRoom(req.user.userId, query['name'], query['type'], query['members'], query['password'], ChannelIcone, res);
        return this.chatService.CreateRoom(req.user.userId, query['name'], query['type'], query['members'], "", ChannelIcone, res);
      }
      return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
    }

}
