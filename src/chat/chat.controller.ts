import { Controller, HttpStatus, Post, Get, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';
import { fileURLToPath } from 'url';
import { query } from 'express';
import { ChatService } from './chat.service';
import { ChannelUserDto, MessageDataDto } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService,
                //private userService: UserService
                ) {}

    // TASK_01 - DONE
    @Post('AddUser')
    async AddUserToChannel(@Req() req, @Body() userChannelPair: ChannelUserDto, @Res() res) {
      return this.chatService.AddUserToChannel(req.user.userId, userChannelPair.user, userChannelPair.channelId, res);
    }

    // TASK_06 - DONE
    @Get('myChannels')
    async GetMyChannels(@Req() req, @Res() res) {
      return this.chatService.GetMyChannels(req.user.userId, res);
    }

    // TASK_09 - DONE
    @Post('sendMessage')
    async SendMessage(@Req() req, @Body() messageData: MessageDataDto, @Res() res) {
      return this.chatService.SendMessage(req.user.userId, messageData.content, messageData.channelId);
    }

    // @Post('UpdateUser/:channelId')
    // async UpdateUserInChannel() {

    // }

    // @Post('UpdateUser/:channelId')
    // async UpdateUserInChannel() {

    // }


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
      let ChannelIcone: string = "http://localhost:8000/upload/defaultChannelIcon.jpg";
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
