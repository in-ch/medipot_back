import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
export declare enum CONSULT_CONSULT {
    '사업 제휴' = 0,
    '입지 문의' = 1,
    '입지 등록' = 2,
    '기타' = 3
}
export declare class Consult extends CommonEntity {
    name: string;
    type: CONSULT_CONSULT;
    phone: string;
    detail: string;
    isDone: boolean;
    user: User;
}
