import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AlarmService } from 'src/alarm/alarm.service';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';
import { ReplyCrudDto, ReplyDeleteDto, ReplyHeaderDto, ReplyPaginationDto, TotalCountDto } from './dto/reply.dto';
import { Reply } from './entities/reply.entity';
export declare class ReplyService {
    private readonly users;
    private readonly writings;
    private readonly replys;
    private readonly nestedReplys;
    private readonly jwtService;
    private readonly alarmService;
    constructor(users: Repository<User>, writings: Repository<Writing>, replys: Repository<Reply>, nestedReplys: Repository<NestedReply>, jwtService: JwtService, alarmService: AlarmService);
    getReplys(request: Request<ReplyPaginationDto>): Promise<OutputDto<PageOutput<Reply[]>>>;
    getReplysWritings(header: ReplyHeaderDto): Promise<OutputDto<Writing[]>>;
    create(payload: ReplyCrudDto, header: ReplyHeaderDto): Promise<OutputDto<Reply>>;
    delete(request: Request<ReplyDeleteDto>, header: ReplyHeaderDto): Promise<OutputDto<Reply>>;
    totalCount(request: Request<TotalCountDto>): Promise<OutputDto<number>>;
}
