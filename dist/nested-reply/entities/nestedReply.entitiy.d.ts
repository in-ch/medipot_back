import { CommonEntity } from 'src/commons/entities/common.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { Report } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entitiy';
export declare class NestedReply extends CommonEntity {
    comment: string;
    user: User;
    reply: Reply;
    reported: Report[];
}
