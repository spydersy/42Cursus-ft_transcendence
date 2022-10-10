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

    @Get('myChannels')
    async GetMyRooms(@Req() req, @Res() res) {
      return this.chatService.GetMyRooms(req.user.userId, res);
    }

    @Post('sendMessage')
    async SendMessage(@Req() req, @Body() messageData, @Res() res) {
      if (messageData === undefined || messageData['content'] === undefined
        || messageData['channelId'] === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Request Malformed"});
      }
      return this.chatService.SendMessage(req.user.userId, messageData, res);
    }

    // @Post('AddUser/:channelId')
    // async AddUserToChannel() {

    // }

    // @Post('UpdateUser/:channelId')
    // async UpdateUserInChannel() {

    // }

    // @Post('UpdateUser/:channelId')
    // async UpdateUserInChannel() {

    // }

    @Post('usersCRUD/:channelId')
    async UsersCRUD(@Req() req, @Query() query, @Body() data, @Res() res) {
      if (query['event']) {
        switch (query['event']) {
          case 'add':
            return this.chatService.AddUserToChannel(req.user.userId, data, res);
          // case 'update':
            // return this.chatService.UpdateUserInChannel(req.user.userId, data, res);
          // case 'delete':
            // return this.chatService.DeleteUserFromChannel(req.user.userId, data, res);
          default:
            return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Request'});
        }
      }
      // ADD USER
      // UPDATE USER
      // DELETE USER
    }

    @Get('messages/:channelId')
    async GetMessages(@Req() req, @Res() res) {
      return this.chatService.GetChannelMessages(req.user.userId, req.params.channelId, res);
    }

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
      let ChannelIcone: string = "";
      if (file !== undefined)
        ChannelIcone = encodeURI(`http://localhost:8000/upload/${file.filename}`);
      if (channelData === undefined || channelData['name'] === undefined || channelData['type'] === undefined
      &&  channelData['members'] === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
      }

      var membersObj = JSON.parse(channelData['members']);
      console.log("__MEMBERS__OBJ__DBG__ : ", membersObj);
      if (channelData['type'] === 'protected' && channelData['password'] === undefined)
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Bad Request"});
      if (channelData['type'] === 'protected' && channelData['password'] !== undefined)
        return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], membersObj, channelData['password'], ChannelIcone, res);
      return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], membersObj, "", ChannelIcone, res);
    }
}
