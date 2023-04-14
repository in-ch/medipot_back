import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos';
import { MeInputDto } from 'src/user/dto/user.dto';
import { CONSULT_CONSULT } from '../entities/consult.entitiy';

export class SendConsultAddParams {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(CONSULT_CONSULT)
  type: CONSULT_CONSULT;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  detail: string;
}
export class SendConsultAddHeaders extends MeInputDto {}
export class SendConsultAddResponse extends SendConsultAddParams {}

export class ConsultListPagination extends PaginationDto {}
export class ConsultListHeaders extends MeInputDto {}
export class DoneConsultParams {
  @ApiProperty()
  @IsNumber()
  no: number;
}
export class DoneConsultResponse extends SendConsultAddParams {}
