import { Request } from 'express';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { Writing } from 'src/writing/entities/writing';
import { ReplyCrudDto, ReplyDeleteDto, ReplyHeaderDto, ReplyPaginationDto, TotalCountDto } from './dto/reply.dto';
import { Reply } from './entities/reply.entity';
import { ReplyService } from './reply.service';
export declare class ReplyController {
    private readonly replysService;
    constructor(replysService: ReplyService);
    getReplys(request: Request<ReplyPaginationDto>): Promise<OutputDto<PageOutput<Reply[]>>>;
    getReplysWritings(header: ReplyHeaderDto): Promise<OutputDto<Writing[]>>;
    like(payload: ReplyCrudDto, header: ReplyHeaderDto): Promise<OutputDto<Reply>>;
    replyDelete(request: Request<ReplyDeleteDto>, header: ReplyHeaderDto): Promise<OutputDto<Reply>>;
    totalCount(request: Request<TotalCountDto>): Promise<OutputDto<number>>;
}
