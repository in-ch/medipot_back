import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
export declare class Like extends CommonEntity {
    user: User;
    writing: Writing;
}
