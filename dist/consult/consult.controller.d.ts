import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { ConsultService } from './consult.service';
import { ConsultListHeaders, ConsultListPagination, DoneConsultParams, DoneConsultResponse, SendConsultAddHeaders, SendConsultAddParams, SendConsultAddResponse } from './dto/consult.dto';
import { Consult } from './entities/consult.entitiy';
export declare class ConsultController {
    private readonly consultService;
    constructor(consultService: ConsultService);
    sendConsultAdd(params: SendConsultAddParams, header: SendConsultAddHeaders): Promise<OutputDto<SendConsultAddResponse>>;
    list(request: Request<ConsultListPagination>, header: ConsultListHeaders): Promise<OutputDto<Consult[]>>;
    doneConsult(params: DoneConsultParams): Promise<OutputDto<DoneConsultResponse>>;
}
