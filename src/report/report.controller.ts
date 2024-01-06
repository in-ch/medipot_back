import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OutputDto } from 'src/commons/dtos';
import { JwtAuthGuard } from 'src/user/strategy/jwtAuthentication.guard';
import { ReportService } from './report.service';
import {
  NestedReportHeaderDto,
  NestedReportReplyCrudDto,
  ReportCrudDto,
  ReportHeaderDto,
  ReportReplyCrudDto,
} from './dto/report.dto';

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
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Post('/reply')
  createReply(
    @Body() payload: ReportReplyCrudDto,
    @Headers() header: ReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.reportService.createReplyReport(payload, header);
  }

  @ApiBody({ type: NestedReportReplyCrudDto })
  @ApiResponse({ description: '성공', type: OutputDto<boolean> })
  @UseGuards(JwtAuthGuard)
  @Post('/nestedReply')
  createNestedReply(
    @Body() payload: NestedReportReplyCrudDto,
    @Headers() header: NestedReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    return this.reportService.createNestedReplyReport(payload, header);
  }
}
