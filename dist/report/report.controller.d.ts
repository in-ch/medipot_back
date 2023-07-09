import { OutputDto } from 'src/commons/dtos';
import { NestedReportHeaderDto, NestedReportReplyCrudDto, ReportCrudDto, ReportHeaderDto, ReportReplyCrudDto } from './dto/report.dto';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(payload: ReportCrudDto, header: ReportHeaderDto): Promise<OutputDto<boolean>>;
    createReply(payload: ReportReplyCrudDto, header: ReportHeaderDto): Promise<OutputDto<boolean>>;
    createNestedReply(payload: NestedReportReplyCrudDto, header: NestedReportHeaderDto): Promise<OutputDto<boolean>>;
}
