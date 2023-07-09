import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
export declare class AuthPhone extends CommonEntity {
    user: User;
    code: string;
}
