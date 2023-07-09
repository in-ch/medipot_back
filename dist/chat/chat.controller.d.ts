import { Request } from 'express';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { MessageProps } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatCrudDto } from './dto/chat.dto';
import { Chat } from './entities/chat.entitiy';
export declare class ChatController {
    private readonly chatsService;
    constructor(chatsService: ChatService);
    getMessages(request: Request<ChatCrudDto>): Promise<OutputDto<PageOutput<Chat[]>>>;
    create(params: MessageProps): Promise<OutputDto<Chat>>;
}
