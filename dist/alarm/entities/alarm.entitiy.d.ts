import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
export declare enum ALARM_TYPE {
    comment = "COMMENT",
    commentToComment = "COMMENT_TO_COMMENT",
    like = "LIKE",
    chat = "CHAT"
}
export declare class Alarm extends CommonEntity {
    user: User;
    type: ALARM_TYPE;
}
