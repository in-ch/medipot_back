import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrantGuard } from 'src/user/strategy/grant.strategy';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { LikeLocationService } from './like-location.service';

@ApiTags('입지 좋아용')
@Controller('likeLocation')
@UseGuards(JwtAuthGuard, GrantGuard)
export class LikeLocationController {
  constructor(private readonly likeLocationsService: LikeLocationService) {}
}
