import { CommonEntity } from 'src/commons/entities/common.entity';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Report } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
export declare class Reply extends CommonEntity {
    user: User;
    writing: Writing;
    reported: Report[];
    comment: string;
    nestedReply: NestedReply[];
    totalCount?: number;
}
