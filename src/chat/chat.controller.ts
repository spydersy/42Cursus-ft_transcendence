import { Controller, HttpStatus, Post, Get, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, Body } from '@nestjs/common';
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

    @Get('createRoom')
    @UseInterceptors(
        FileInterceptor('icone', {
          storage: diskStorage({
            destination: './upload',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
        }),
    )
    async CreateRoom(@Req() req, @UploadedFile() file,
    @Body('channelData') channelData, @Res() res) {
      console.log("__NAME__DBG__    : ", query['name']);
      console.log("__TYPE__DBG__    : ", query['type']);
      console.log("__MEMBERS__DBG__ : ", query['members']);
      if (channelData === undefined || channelData['name'] === undefined || channelData['type'] === undefined
      &&  channelData['members'] === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
      }
      if (channelData['type'] === 'protected' && channelData['password'] === undefined)
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});

      const ChannelIcone = `http://localhost:8000/upload/${file.filename}`;

      if (channelData['type'] === 'protected' && channelData['password'] !== undefined)
        return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], channelData['members'], channelData['password'], ChannelIcone, res);
      return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], channelData['members'], "", ChannelIcone, res);
    }

}
