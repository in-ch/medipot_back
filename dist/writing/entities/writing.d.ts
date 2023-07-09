import { Like } from 'src/like/entities/like.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { Report } from 'src/report/entities/report.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';
export declare class Writing extends CommonEntity {
    title: string;
    text: string;
    tags: string[];
    imgs: string[];
    user: User;
    like: Like[];
    reply: Reply[];
    reported: Report[];
}
