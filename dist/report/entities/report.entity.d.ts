import { CommonEntity } from 'src/commons/entities/common.entity';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
export declare class Report extends CommonEntity {
    user_report: User;
    user_reported: User;
    writing: Writing;
    reply: Reply;
    nestedReply: NestedReply;
    isProcessing: boolean;
}
