import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
export interface MessageProps {
    id: string;
    toUserNo: string;
    toUserProfile: string;
    fromUserNo: string;
    fromUserProfile: string;
    type: string;
    data: string;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
    onChat(client: Socket, message: MessageProps): Promise<void>;
}
