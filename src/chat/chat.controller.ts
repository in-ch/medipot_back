import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { MessageProps } from './chat.gateway';
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
  getMessages(@Req() request: Request<ChatCrudDto>): Promise<OutputDto<Chat[]>> {
    return this.chatsService.getMessages(request);
  }

  @ApiBody({})
  @ApiResponse({ description: '성공', type: OutputDto<Chat> })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  create(@Body() params: MessageProps): Promise<OutputDto<Chat>> {
    return this.chatsService.createMessage(params);
  }
}
