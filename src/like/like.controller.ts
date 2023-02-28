import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { LikeCrudDto, LikeHeaderDto } from './dto/like';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likesService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  like(
    @Body() payload: LikeCrudDto,
    @Headers() header: LikeHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.likesService.like(payload, header);
  }
}
