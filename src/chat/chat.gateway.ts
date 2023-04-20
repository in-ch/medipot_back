import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(3131, {
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private appService: ChatService) {}

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
  async onChat(client: Socket, message) {
    client.broadcast.emit('chat', message); //전체에게 방송함
  }
}
