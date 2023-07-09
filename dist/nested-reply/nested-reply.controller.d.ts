import { Request } from 'express';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { CreateNestedReplyHeaderParams, CreateNestedReplyParams, DeletedNestedReplyCrudDto, DeletedNestedReplyHeaderDto, NestedReplyListPagination } from './dto/nestedReply.dto';
import { NestedReply } from './entities/nestedReply.entitiy';
import { NestedReplyService } from './nested-reply.service';
export declare class NestedReplyController {
    private readonly nestedReplyService;
    constructor(nestedReplyService: NestedReplyService);
    addNestedReply(params: CreateNestedReplyParams, header: CreateNestedReplyHeaderParams): Promise<OutputDto<NestedReply>>;
    getNestedReplys(request: Request<NestedReplyListPagination>): Promise<OutputDto<PageOutput<NestedReply[]>>>;
    deleteNestedReply(payload: DeletedNestedReplyCrudDto, header: DeletedNestedReplyHeaderDto): Promise<OutputDto<NestedReply>>;
}
