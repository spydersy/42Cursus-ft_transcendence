import { ChatService } from './chat.service';
import { ChannelUserDto, UserRestrictionDto } from 'src/dtos/Inputs.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    AddUserToChannel(req: any, userChannelPair: ChannelUserDto, res: any): Promise<any>;
    UpdateUserInChannel(req: any, userChannelPair: ChannelUserDto, role: any, res: any): Promise<any>;
    UpdateUserRestrictionInChannel(req: any, userRestriction: UserRestrictionDto, res: any): Promise<void>;
    DeleteUserFromChannel(req: any, channelId: any, res: any): Promise<any>;
    GetMyChannels(req: any, res: any): Promise<any>;
    GetMessages(req: any, res: any): Promise<any>;
    CreateRoom(file: any, req: any, channelData: any, res: any): Promise<any>;
}
