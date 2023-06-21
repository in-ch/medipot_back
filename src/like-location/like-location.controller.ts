import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputDto } from 'src/commons/dtos';
import { GrantGuard } from 'src/user/strategy/grant.strategy';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { LikeLocationCrudDto, LikeLocationHeaderDto } from './dto/like-location';
import { LikeLocationService } from './like-location.service';

@ApiTags('입지 좋아용')
@Controller('likeLocation')
@UseGuards(JwtAuthGuard, GrantGuard)
export class LikeLocationController {
  constructor(private readonly likeLocationsService: LikeLocationService) {}

  @ApiBody({ type: LikeLocationCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @Post('')
  likeLocation(
    @Body() payload: LikeLocationCrudDto,
    @Headers() header: LikeLocationHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.likeLocationsService.likeLocation(payload, header);
  }
}
