import { Controller, HttpStatus, Post, Get, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/app.utils';
import { ChatService } from './chat.service';
import { ChannelData, ChannelUserDto, JoinChannelDto, MessageDataDto, UserRestrictionDto } from 'src/dtos/Inputs.dto';
import { PERMISSION, RESCTRICTION } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {}

    //DONE
    @Post('joinChannel')
    async AddUserToChannel(@Req() req, @Body() joinChannel: JoinChannelDto, @Res() res) {
      return this.chatService.JoinChannel(req.user.userId, joinChannel.channelId, joinChannel.password, res);
    }

    //DONE
    @Post('UpdateUserPermission')
    async UpdateUserInChannel(@Req() req, @Body() userChannelPair: ChannelUserDto, @Query('role') role, @Res() res) {
      if (role !== undefined && (role === 'admin' || role === 'user'))
        return this.chatService.UpdateUserInChannel(req.user.userId, userChannelPair.user,
          userChannelPair.channelId, role === 'admin' ? PERMISSION.ADMIN : PERMISSION.USER, res);
      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Query Not Set Properly'});
    }

    //PROG
    @Post('UpdateUserRestriction')
    async UpdateUserRestrictionInChannel(@Req() req, @Body() userRestriction: UserRestrictionDto, @Res() res) {
      if (userRestriction.restriction === 'BAN' || userRestriction.restriction === 'MUTE'
        || userRestriction.restriction === 'UNBAN')
        return this.chatService.UpdateUserRestrictionInChannel(req.user.userId, userRestriction.user,
          userRestriction.channelId,
          userRestriction.restriction === "BAN" ? RESCTRICTION.BANNED
          : userRestriction.restriction === "MUTE" ? RESCTRICTION.MUTED
          : RESCTRICTION.NULL, userRestriction.duration, res);

      return res.status(HttpStatus.BAD_REQUEST).send({'message': 'BAD REQUEST'});
    }

    //Done
    @Delete('LeaveChannel')
    async DeleteUserFromChannel(@Req() req, @Query('channel') channelId, @Res() res) {
      if (channelId !== undefined)
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

    @Get('managedChannels')
    async GetManagedChannels(@Req() req, @Res() res) {
      return this.chatService.GetManagedChannels(req.user.userId, res);
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
    @Body() channelData : ChannelData, @Res() res) {
      let ChannelIcone: string = "https://myanimelist.tech/api/avatar?name=&animeName=one_Piece_Crews";
      if (file !== undefined)
        ChannelIcone = encodeURI(process.env.BACKEND_URL + `/upload/${file.filename}`);
      var membersObj = JSON.parse(channelData['members']);
      console.log("__CHANNEL_DATA__DBG__ : ", channelData);
      if (channelData['type'] === 'protected' && channelData['password'] === undefined)
        return res.status(HttpStatus.BAD_REQUEST).send({'message': "Password Required"});
      if (channelData['type'] === 'protected' && channelData['password'] !== undefined)
        return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], membersObj, channelData['password'], ChannelIcone, res);
      return this.chatService.CreateRoom(req.user.userId, channelData['name'], channelData['type'], membersObj, null, ChannelIcone, res);
    }
}
