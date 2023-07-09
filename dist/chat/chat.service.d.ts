import { Request } from 'express';
import { AlarmService } from 'src/alarm/alarm.service';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { MessageProps } from './chat.gateway';
import { ChatCrudDto } from './dto/chat.dto';
import { Chat } from './entities/chat.entitiy';
export declare class ChatService {
    private chats;
    private users;
    private readonly alarmService;
    constructor(chats: Repository<Chat>, users: Repository<User>, alarmService: AlarmService);
    createMessage(message: MessageProps): Promise<OutputDto<Chat>>;
    getMessages(request: Request<ChatCrudDto>): Promise<OutputDto<PageOutput<Chat[]>>>;
}
