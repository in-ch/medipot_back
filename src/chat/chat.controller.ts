import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ChatService } from './chat.service';
import { ChatCrudDto } from './dto/chat.dto';
import { Chat } from './entities/chat.entitiy';

@ApiTags('채팅')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  @ApiBody({})
  @ApiResponse({ description: '성공', type: OutputDto<Chat[]> })
  @UseGuards(JwtAuthGuard)
  @Get()
  getMessages(@Body() payload: ChatCrudDto): Promise<OutputDto<Chat[]>> {
    return this.chatsService.getMessages(payload);
  }
}
