import { Controller } from '@nestjs/common';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replysService: ReplyService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post('')
  // like(
  //   @Body() payload: LikeCrudDto,
  //   @Headers() header: LikeHeaderDto,
  // ): Promise<OutputDto<boolean>> {
  //   return this.replysService.like(payload, header);
  // }
}
