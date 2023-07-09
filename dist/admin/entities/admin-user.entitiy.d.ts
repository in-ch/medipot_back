import { BaseEntity } from 'typeorm';
export declare enum grant {
    'ADMIN' = 0,
    'USER' = 1
}
export declare class AdminUser extends BaseEntity {
    no: number;
    id: string;
    password: string;
    name: string;
    grant: grant;
    token?: string;
    refresh_token?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
