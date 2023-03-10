import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ReportCrudDto, ReportHeaderDto, ReportReplyCrudDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(
    @Body() payload: ReportCrudDto,
    @Headers() header: ReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.reportService.create(payload, header);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reply')
  createReply(
    @Body() payload: ReportReplyCrudDto,
    @Headers() header: ReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.reportService.createReply(payload, header);
  }
}
