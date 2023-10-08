import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';
import { DEPARTMENT, UserGrant } from '../entities/user.entitiy';

export class UserCreateInputCrudDto {
  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  marketingConsent: boolean;
}

export class UserCreateOutputCrudDto extends UserCreateInputCrudDto {
  access_token?: string;
  refresh_token?: string;
}

export class UserLoginCrudDto extends PickType(UserCreateInputCrudDto, ['email', 'password']) {}
export class UserLoginOutputCrudDto extends UserCreateInputCrudDto {
  token?: string;
  refresh_token?: string;
}

export class MeInputDto {
  @ApiProperty()
  @IsString()
  authorization: string;
}
export class MeOutputCrudDto extends UserLoginOutputCrudDto {}

export class UpdateProfileCrudDto {
  @ApiProperty()
  profile?: any;

  @ApiProperty()
  nickname?: any;

  @ApiProperty()
  department?: any;
}
export class UpdateProfileHeaderDto extends MeInputDto {}
export class UpdateProfileOutputDto {}

export class SearchUserCrudDto {
  @ApiProperty()
  @IsNumber()
  no: number;
}

export class RefreshParams {
  @ApiProperty()
  @IsNumber()
  no: number;

  @ApiProperty()
  @IsString()
  refresh_token: string;
}
export class RefreshHeader extends MeInputDto {}
export class RefreshOutputDto extends MeInputDto {}

export class GetUserGrantHeader extends MeInputDto {}
export class DeleteUserHeader extends MeInputDto {}

export class RequestGrantCrudDto {
  @ApiProperty()
  @IsString()
  license: string;
}
export class RequestGrantHeaderDto extends MeInputDto {}

export class UpdateUserGrantBodyDto {
  @ApiProperty()
  @IsNumber()
  userNo: number;

  @ApiProperty()
  @IsString()
  grant: UserGrant;
}

export class RequestDepartmentHeaderDto extends MeInputDto {}

export class UserGrantRequestListPagination extends PaginationDto {}
