import { PaginationDto } from 'src/commons/dtos';
import { MeInputDto } from 'src/user/dto/user.dto';
import { CONSULT_CONSULT } from '../entities/consult.entitiy';
export declare class SendConsultAddParams {
    name: string;
    type: CONSULT_CONSULT;
    phone: string;
    detail: string;
}
export declare class SendConsultAddHeaders extends MeInputDto {
}
export declare class SendConsultAddResponse extends SendConsultAddParams {
}
export declare class ConsultListPagination extends PaginationDto {
}
export declare class ConsultListHeaders extends MeInputDto {
}
export declare class DoneConsultParams {
    no: number;
}
export declare class DoneConsultResponse extends SendConsultAddParams {
}
