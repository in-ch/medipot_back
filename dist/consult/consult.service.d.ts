import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import { ConsultListHeaders, ConsultListPagination, DoneConsultParams, DoneConsultResponse, SendConsultAddHeaders, SendConsultAddParams, SendConsultAddResponse } from './dto/consult.dto';
import { Consult } from './entities/consult.entitiy';
export declare class ConsultService {
    private readonly consults;
    private readonly users;
    private readonly jwtService;
    private readonly notionService;
    constructor(consults: Repository<Consult>, users: Repository<User>, jwtService: JwtService, notionService: NotionService);
    list(query: ConsultListPagination, header: ConsultListHeaders): Promise<OutputDto<Consult[]>>;
    sendConsultAdd(params: SendConsultAddParams, header: SendConsultAddHeaders): Promise<OutputDto<SendConsultAddResponse>>;
    doneConsult(params: DoneConsultParams): Promise<OutputDto<DoneConsultResponse>>;
}
