import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entitiy';
import { JwtService } from '@nestjs/jwt';
import { Writing } from 'src/writing/entities/writing';
import { NestedReportHeaderDto, NestedReportReplyCrudDto, ReportCrudDto, ReportHeaderDto, ReportReplyCrudDto } from './dto/report.dto';
import { OutputDto } from 'src/commons/dtos';
import { Report } from './entities/report.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { NotionService } from 'src/utills/notion/notion.service';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
export declare class ReportService {
    private readonly users;
    private readonly writings;
    private readonly replys;
    private readonly nestedReplys;
    private readonly reports;
    private readonly jwtService;
    private readonly notionService;
    constructor(users: Repository<User>, writings: Repository<Writing>, replys: Repository<Reply>, nestedReplys: Repository<NestedReply>, reports: Repository<Report>, jwtService: JwtService, notionService: NotionService);
    create(payload: ReportCrudDto, header: ReportHeaderDto): Promise<OutputDto<boolean>>;
    createReplyReport(payload: ReportReplyCrudDto, header: ReportHeaderDto): Promise<OutputDto<boolean>>;
    createNestedReplyReport(payload: NestedReportReplyCrudDto, header: NestedReportHeaderDto): Promise<OutputDto<boolean>>;
}
