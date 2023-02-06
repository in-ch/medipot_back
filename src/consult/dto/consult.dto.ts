import { IsEnum, IsNumber, IsString } from 'class-validator';
import { MeInputDto } from 'src/user/dto/user.dto';
import { CONSULT_CONSULT } from '../entities/consult.entitiy';

export class SendConsultAddParams {
  @IsString()
  name: string;

  @IsEnum(CONSULT_CONSULT)
  type: CONSULT_CONSULT;

  @IsString()
  phone: string;

  @IsString()
  detail: string;
}
export class SendConsultAddHeaders extends MeInputDto {}
export class SendConsultAddResponse extends SendConsultAddParams {}

export class DoneConsultParams {
  @IsNumber()
  no: number;
}
export class DoneConsultResponse extends SendConsultAddParams {}
