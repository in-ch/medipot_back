import { PaginationDto } from 'src/commons/dtos';
import { UserGrant } from '../entities/user.entitiy';
export declare class UserCreateInputCrudDto {
    nickname: string;
    email: string;
    password: string;
    marketingConsent: boolean;
}
export declare class UserCreateOutputCrudDto extends UserCreateInputCrudDto {
    access_token?: string;
    refresh_token?: string;
}
declare const UserLoginCrudDto_base: import("@nestjs/mapped-types").MappedType<Pick<UserCreateInputCrudDto, "email" | "password">>;
export declare class UserLoginCrudDto extends UserLoginCrudDto_base {
}
export declare class UserLoginOutputCrudDto extends UserCreateInputCrudDto {
    token?: string;
    refresh_token?: string;
}
export declare class MeInputDto {
    authorization: string;
}
export declare class MeOutputCrudDto extends UserLoginOutputCrudDto {
}
export declare class UpdateProfileCrudDto {
    profile?: string;
    nickname?: string;
    department?: string;
}
export declare class UpdateProfileHeaderDto extends MeInputDto {
}
export declare class UpdateProfileOutputDto {
}
export declare class SearchUserCrudDto {
    no: number;
}
export declare class RefreshParams {
    no: number;
    refresh_token: string;
}
export declare class RefreshHeader extends MeInputDto {
}
export declare class RefreshOutputDto extends MeInputDto {
}
export declare class GetUserGrantHeader extends MeInputDto {
}
export declare class RequestGrantCrudDto {
    license: string;
}
export declare class RequestGrantHeaderDto extends MeInputDto {
}
export declare class UpdateUserGrantBodyDto {
    userNo: number;
    grant: UserGrant;
}
export declare class RequestDepartmentHeaderDto extends MeInputDto {
}
export declare class UserGrantRequestListPagination extends PaginationDto {
}
export {};
