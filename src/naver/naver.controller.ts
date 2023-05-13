import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputDto } from 'src/commons/dtos';
import { MeOkOutputDto, MePayloadDto } from './dto/naver.dto';
import { NaverService } from './naver.service';

@ApiTags('Naver')
@Controller('naver')
export class NaverController {
  constructor(private readonly naverService: NaverService) {}
  @ApiBody({})
  @ApiResponse({ description: '성공', type: OutputDto<MeOkOutputDto> })
  @Post('/me')
  me(@Body() payload: MePayloadDto): Promise<OutputDto<MeOkOutputDto>> {
    return this.naverService.me(payload);
  }
}
