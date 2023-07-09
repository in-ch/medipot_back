import { Alarm } from 'src/alarm/entities/alarm.entitiy';
import { Chat } from 'src/chat/entities/chat.entitiy';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Consult } from 'src/consult/entities/consult.entitiy';
import { Like } from 'src/like/entities/like.entitiy';
import { Location } from 'src/location/entities/location.entitiy';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Question } from 'src/question/entities/question.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { Writing } from 'src/writing/entities/writing';
import { UserGrantRequest } from './doctorGrant.entitiy';
import { AuthPhone } from 'src/auth/entities/auth-phone.entitiy';
export declare enum grant {
    'ADMIN' = 0,
    'USER' = 1
}
export declare enum UserGrant {
    NONE = "NONE",
    CLIENT = "CLIENT",
    DOCTOR = "DOCTOR"
}
export declare enum DEPARTMENT {
    FM = "FM",
    TB = "TB",
    IM = "IM",
    PED = "PED",
    NR = "NR",
    NP = "NP",
    RM = "RM",
    DER = "DER",
    UR = "UR",
    OBGY = "OBGY",
    PS = "PS",
    NS = "NS",
    EY = "EY",
    GS = "GS",
    ENT = "ENT",
    OS = "OS",
    CS = "CS",
    AN = "AN",
    RO = "RO",
    DR = "DR",
    EM = "EM",
    OEM = "OEM",
    LM = "LM",
    NM = "NM",
    NONE = "\uC9C4\uB8CC\uACFC \uC5C6\uC74C"
}
export declare class User extends CommonEntity {
    email: string;
    nickname: string;
    password: string;
    phone: string;
    grant: UserGrant;
    profile: string;
    marketingConsent: boolean;
    isSocialLogin: boolean;
    department: DEPARTMENT;
    token?: string;
    refresh_token?: string;
    question: Question[];
    consult: Consult[];
    from_chats: Chat[];
    to_chats: Chat[];
    like: Like[];
    writing: Writing[];
    reply: Reply[];
    report: Reply[];
    reported: Reply[];
    alarm: Alarm[];
    authPhone: AuthPhone;
    nestedReply: NestedReply[];
    location: Location[];
    userGrantRequest: UserGrantRequest[];
}
