import { Body, Controller, Delete, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { LikeCrudDto, LikeHeaderDto, UnlikeCrudDto, UnlikeHeaderDto } from './dto/like';
import { LikeService } from './like.service';

@ApiTags('좋아용')
@Controller('like')
export class LikeController {
  constructor(private readonly likesService: LikeService) {}

  @ApiBody({ type: LikeCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Post('')
  like(
    @Body() payload: LikeCrudDto,
    @Headers() header: LikeHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.likesService.like(payload, header);
  }

  @ApiBody({ type: UnlikeCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Delete('')
  unlike(
    @Body() payload: UnlikeCrudDto,
    @Headers() header: UnlikeHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.likesService.unlike(payload, header);
  }
}
