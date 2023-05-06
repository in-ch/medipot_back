import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { grant } from '../entities/admin-user.entitiy';

export class AdminUserCrudDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(grant)
  grant: grant;
}
export class AdminUserLoginCrudDto extends PickType(AdminUserCrudDto, ['id', 'password']) {}

export class AdminUserCreateCrudDto extends AdminUserCrudDto {}
export class AdminUserOutputCrudDto extends AdminUserCrudDto {
  @ApiProperty()
  @IsString()
  token?: string;

  @ApiProperty()
  @IsString()
  refresh_token?: string;
}

export class AdminUserRefreshCrudDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  refresh_token: string;
}
export class AdminUserRefreshOutputCrudDto extends AdminUserCrudDto {
  @ApiProperty()
  @IsString()
  token?: string;

  @ApiProperty()
  @IsString()
  refresh_token?: string;
}
