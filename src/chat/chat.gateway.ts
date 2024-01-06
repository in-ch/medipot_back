import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
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

@WebSocketGateway(3131, {
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  //OnGatewayConnection를 오버라이딩
  async handleConnection() {
    // this.server.emit('users', this.users);
  }

  //OnGatewayDisconnect를 오버라이딩
  async handleDisconnect() {
    // this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, message: MessageProps) {
    const { id, toUserNo, toUserProfile, fromUserNo, fromUserProfile, type, data } = message;
    this.chatService.createMessage(message);
    client.broadcast.emit('chat', message); //전체에게 방송함
  }
}
