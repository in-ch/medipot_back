import { BaseEntity } from 'typeorm';
export declare abstract class CommonEntity extends BaseEntity {
    no: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
