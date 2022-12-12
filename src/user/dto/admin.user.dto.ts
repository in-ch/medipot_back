import { IsEnum, IsString } from "class-validator";

import { grant } from "../entities/user.entitiy";

export class AdminUserCrudDto {
    @IsString()
    name: string;

    @IsString()
    id: string;

    @IsString()
    password: string;

    @IsEnum(grant)
    grant: grant;

}
export class AdminUserCreateCrudDto extends AdminUserCrudDto  {}
export class AdminUserOutputCrudDto extends AdminUserCrudDto  {}