import { Body, Controller, Delete, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import {
  GetLikeLocationsHeaderDto,
  LikeLocationCrudDto,
  LikeLocationHeaderDto,
  UnlikeLocationCrudDto,
  UnlikeLocationHeaderDto,
} from './dto/like-location';
import { LikeLocation } from './entities/like-location.entitiy';
import { LikeLocationService } from './like-location.service';

@ApiTags('입지 좋아용')
@Controller('likeLocation')
@UseGuards(JwtAuthGuard)
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

  @ApiBody({ type: UnlikeLocationCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @Delete('')
  unlikeLocation(
    @Body() payload: UnlikeLocationCrudDto,
    @Headers() header: UnlikeLocationHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.likeLocationsService.unlikeLocation(payload, header);
  }

  @ApiBody({ type: OutputDto<LikeLocation[]> })
  @ApiResponse({ description: '입지 좋아요 리스트', type: OutputDto<LikeLocation[]> })
  @Get('')
  getLikeLocations(
    @Headers() header: GetLikeLocationsHeaderDto,
  ): Promise<OutputDto<LikeLocation[]>> {
    return this.likeLocationsService.getLikeLocations(header);
  }
}
