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

    // @Post('createRoom')
    // @UseInterceptors(
    //     FileInterceptor('icone', {
    //       storage: diskStorage({
    //         destination: './upload',
    //         filename: editFileName,
    //       }),
    //       fileFilter: imageFileFilter,
    //     }),
    // )
    // async CreateRoom(@Req() req, @UploadedFile() file,
    // @Body() bb, @Body('channelData') channelData, @Res() res) {
    //   console.log("__BODY__DBG__ : ", bb);
    //   console.log("__CHANNELDATA__DBG__ : ", channelData);

    //   if (channelData === undefined || channelData['name'] === undefined || channelData['type'] === undefined
    //   &&  channelData['members'] === undefined) {
    //     return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
    //   }
    //   if (channelData['type'] === 'protected' && channelData['password'] === undefined)
    //     return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});

    //     console.log("___FILE___ : ", file);
    //   const ChannelIcone = `http://localhost:8000/upload/${file.filename}`;

    //   if (channelData['type'] === 'protected' && channelData['password'] !== undefined)
    //     return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], channelData['members'], channelData['password'], ChannelIcone, res);
    //   return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], channelData['members'], "", ChannelIcone, res);
    // }


    @Post('createRoom')
    @UseInterceptors(
        FileInterceptor('icone', {
          storage: diskStorage({
            destination: './upload',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
        }),
    )
    async CreateRoom(@UploadedFile() file, @Req() req,
    @Body() channelData, @Res() res) {
      console.log("__BODY__DBG__ : ", channelData);
      console.log("___FILE___ : ", file);
      const ChannelIcone = encodeURI(`http://localhost:8000/upload/${file.filename}`);

      if (channelData === undefined || channelData['name'] === undefined || channelData['type'] === undefined
      &&  channelData['members'] === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
      }
      if (channelData['type'] === 'protected' && channelData['password'] === undefined)
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
      if (channelData['type'] === 'protected' && channelData['password'] !== undefined)
        return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], channelData['members'], channelData['password'], ChannelIcone, res);
      return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], channelData['members'], "", ChannelIcone, res);
    }
}
