import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
export declare enum MESSAGE_TYPE {
    message = "MESSAGE",
    image = "IMAGE"
}
export declare class Chat extends CommonEntity {
    message: string;
    isRead: boolean;
    type: MESSAGE_TYPE;
    fromUser: User;
    toUser: User;
}
