import { Request } from 'express';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { MeInputDto } from 'src/user/dto/user.dto';
import { WritingCreateDto, WritingCreateOutputDto, WritingDeleteDto, WritingDetailDto, WritingListDto } from './dto/writing.dto';
import { Writing } from './entities/writing';
import { WritingService } from './writing.service';
export declare class WritingController {
    private readonly writingService;
    constructor(writingService: WritingService);
    create(header: MeInputDto, payload: WritingCreateDto): Promise<OutputDto<WritingCreateOutputDto>>;
    getWritings(request: Request<WritingListDto>): Promise<OutputDto<PageOutput<Writing[]>>>;
    getWriting(request: Request<WritingDetailDto>): Promise<OutputDto<Writing>>;
    deleteWriting(header: MeInputDto, payload: WritingDeleteDto): Promise<OutputDto<Writing>>;
}
