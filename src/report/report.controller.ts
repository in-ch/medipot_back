import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ReportCrudDto, ReportHeaderDto, ReportReplyCrudDto } from './dto/report.dto';
import { ReportService } from './report.service';

@ApiTags('신고')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiBody({ type: ReportCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Post('')
  create(
    @Body() payload: ReportCrudDto,
    @Headers() header: ReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.reportService.create(payload, header);
  }

  @ApiBody({ type: ReportReplyCrudDto })
  @ApiCreatedResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Post('/reply')
  createReply(
    @Body() payload: ReportReplyCrudDto,
    @Headers() header: ReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.reportService.createReply(payload, header);
  }
}
