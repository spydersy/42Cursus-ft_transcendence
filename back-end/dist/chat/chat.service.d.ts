import { PrismaService } from 'src/prisma/prisma.service';
import { CHANNEL, PERMISSION } from '@prisma/client';
import { UserService } from 'src/user/user.service';
declare enum USERSTAT {
    MUTED = 0,
    ACCESS = 1,
    NOTFOUND = 2
}
export interface userInChannel {
    permission: string;
    restriction: string;
    restrictionTime: string;
    duration: number;
    login: string;
    displayName: string;
    defaultAvatar: string;
}
export interface myChannelsDto {
    channelId: number;
    access: CHANNEL;
    name: string;
    picture: string;
    password: string;
    nbMessages: number;
    lastUpdate: Date;
    users: userInChannel[];
}
export declare class ChatService {
    private userService;
    private prisma;
    constructor(userService: UserService, prisma: PrismaService);
    CreatDMChannel(SenderId: number, ReceiverId: number): Promise<void>;
    GetChannelMessages(me: number, channelId: string, res: any): Promise<any>;
    SendMessage(me: number, messageContent: string, channelId: string): Promise<void>;
    GetMyChannels(me: number, res: any): Promise<any>;
    UpdateUserInChannel(me: number, user: string, channelId: string, role: PERMISSION, res: any): Promise<any>;
    DeleteUserFromChannel(me: number, user: string, channelId: string, res: any): Promise<any>;
    UpdateUserRestrictionInChannel(me: number, user: string, channel: string, restriction: string, duration: number, res: any): Promise<void>;
    AddUserToChannel(me: number, user: string, channelId: string, res: any): Promise<any>;
    CreateRoom(me: number, channelName: string, type: string, members: string[], password: string, channelIcone: string, res: any): Promise<any>;
    generateChannelDto(me: number, channels: any): Promise<myChannelsDto[]>;
    CanUpdateChannel(userId: number, channelId: string): Promise<boolean>;
    GetChannelById(channelId: string): Promise<import(".prisma/client").channels>;
    FindUserInChannel(userId: number, channelId: string): Promise<import(".prisma/client").channelsUsers>;
    PostMessageValidationLayer(me: number, messageContent: string, channelId: string): Promise<USERSTAT>;
    GetMessageValidationLayer(me: number, messageContent: string, channelId: string): Promise<boolean>;
}
export {};
