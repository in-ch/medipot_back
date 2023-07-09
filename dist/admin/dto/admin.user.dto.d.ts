import { grant } from '../entities/admin-user.entitiy';
export declare class AdminUserCrudDto {
    name: string;
    id: string;
    password: string;
    grant: grant;
}
declare const AdminUserLoginCrudDto_base: import("@nestjs/mapped-types").MappedType<Pick<AdminUserCrudDto, "id" | "password">>;
export declare class AdminUserLoginCrudDto extends AdminUserLoginCrudDto_base {
}
export declare class AdminUserCreateCrudDto extends AdminUserCrudDto {
}
export declare class AdminUserOutputCrudDto extends AdminUserCrudDto {
    token?: string;
    refresh_token?: string;
}
export declare class AdminUserRefreshCrudDto {
    id: string;
    refresh_token: string;
}
export declare class AdminUserRefreshOutputCrudDto extends AdminUserCrudDto {
    token?: string;
    refresh_token?: string;
}
export {};
