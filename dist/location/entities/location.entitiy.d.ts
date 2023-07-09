import { CommonEntity } from 'src/commons/entities/common.entity';
import { Question } from 'src/question/entities/question.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { LikeLocation } from 'src/like-location/entities/like-location.entitiy';
export declare class Location extends CommonEntity {
    name: string;
    deposit: number;
    depositMonly: number;
    premium: number;
    manageCost: number;
    brokerage: number;
    departments: string[];
    keywords: string[];
    dedicatedArea: number;
    supplyArea: number;
    etc: string;
    address: string;
    detailAddress: string;
    parkingCapacity: number;
    approvalDate: string;
    detail: string;
    imgs: string[];
    lat: number;
    lng: number;
    isApproved: boolean;
    like: LikeLocation[];
    question: Question[];
    user: User;
}
