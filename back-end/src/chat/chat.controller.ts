import { Controller, HttpStatus, Post, Get, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';
import { fileURLToPath } from 'url';
import { query } from 'express';
import { ChatService } from './chat.service';
import { ChannelUserDto, MessageDataDto, UserRestrictionDto } from 'src/dtos/Inputs.dto';
import { UserService } from 'src/user/user.service';
import { PERMISSION } from '@prisma/client';

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

    // TASK_01 - DONE
    @Post('UpdateUserPermission')
    async UpdateUserInChannel(@Req() req, @Body() userChannelPair: ChannelUserDto, @Query('role') role, @Res() res) {
      if (role && (role === 'admin' || role === 'user'))
        return this.chatService.UpdateUserInChannel(req.user.userId, userChannelPair.user,
          userChannelPair.channelId, role === 'admin' ? PERMISSION.ADMIN : PERMISSION.USER, res);
      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Query Not Set Properly'});
    }

    @Post('UpdateUserRestriction')
    async UpdateUserRestrictionInChannel(@Req() req, @Body() userRestriction: UserRestrictionDto, @Res() res) {
      return this.chatService.UpdateUserRestrictionInChannel(req.user.userId, userRestriction.user,
        userRestriction.channelId, userRestriction.restriction, userRestriction.duration, res);
    }

    @Delete('DeleteUser/:user')
    async DeleteUserFromChannel(@Req() req, @Query('channel') channelId, @Res() res) {
      if (channelId && (channelId === 'admin' || channelId === 'user'))
        return this.chatService.DeleteUserFromChannel(req.user.userId, req.params.user, channelId, res);
      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Query Not Set Properly'});
    }

    @Get('myChannels')
    async GetMyChannels(@Req() req, @Res() res) {
      return this.chatService.GetMyChannels(req.user.userId, res);
    }

    @Get('allChannels')
    async GetAllChannels(@Req() req, @Res() res) {
      return this.chatService.GetAllChannels(res);
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
      let ChannelIcone: string = "https://myanimelist.tech/api/avatar?name=&animeName=one_Piece_Crews";
      if (file !== undefined)
        ChannelIcone = encodeURI(process.env.BACKEND_URL + `/upload/${file.filename}`);
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
