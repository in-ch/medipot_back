import { IsEnum, IsString } from 'class-validator';
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

export class SendConsultAddResponse extends SendConsultAddParams {}
