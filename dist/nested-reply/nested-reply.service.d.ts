import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { AlarmService } from 'src/alarm/alarm.service';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entitiy';
import { CreateNestedReplyHeaderParams, CreateNestedReplyParams, DeletedNestedReplyCrudDto, DeletedNestedReplyHeaderDto, NestedReplyListPagination } from './dto/nestedReply.dto';
import { NestedReply } from './entities/nestedReply.entitiy';
export declare class NestedReplyService {
    private readonly nestedReplys;
    private readonly users;
    private readonly replys;
    private readonly jwtService;
    private readonly alarmService;
    constructor(nestedReplys: Repository<NestedReply>, users: Repository<User>, replys: Repository<Reply>, jwtService: JwtService, alarmService: AlarmService);
    addNestedReply(params: CreateNestedReplyParams, header: CreateNestedReplyHeaderParams): Promise<OutputDto<NestedReply>>;
    getNestedReplys(request: Request<NestedReplyListPagination>): Promise<OutputDto<PageOutput<NestedReply[]>>>;
    deletedNestedReply(payload: DeletedNestedReplyCrudDto, header: DeletedNestedReplyHeaderDto): Promise<OutputDto<NestedReply>>;
}
