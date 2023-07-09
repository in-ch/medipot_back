import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from './user.entitiy';
export declare class UserGrantRequest extends CommonEntity {
    license: string;
    user: User;
    isDone: boolean;
}
