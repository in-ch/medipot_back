import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrantGuard } from 'src/user/strategy/grant.strategy';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { EventService } from './event.service';

@ApiTags('이벤트')
@Controller('event')
@UseGuards(JwtAuthGuard, GrantGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // @ApiBody({ type: UnlikeCrudDto })
  // @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  // @Delete('')
  // unlike(
  //   @Body() payload: UnlikeCrudDto,
  //   @Headers() header: UnlikeHeaderDto,
  // ): Promise<OutputDto<boolean>> {
  //   return this.likesService.unlike(payload, header);
  // }
}
