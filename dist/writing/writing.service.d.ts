import { Repository } from 'typeorm';
import { Writing } from './entities/writing';
import { MeInputDto } from 'src/user/dto/user.dto';
import { WritingCreateDto, WritingCreateOutputDto, WritingDeleteDto, WritingDetailDto, WritingListDto } from './dto/writing.dto';
import { OutputDto, PageOutput } from 'src/commons/dtos';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entitiy';
export declare class WritingService {
    private readonly writings;
    private readonly users;
    private readonly jwtService;
    constructor(writings: Repository<Writing>, users: Repository<User>, jwtService: JwtService);
    getWritings(query: WritingListDto): Promise<OutputDto<PageOutput<Writing[]>>>;
    getWriting(query: WritingDetailDto): Promise<OutputDto<Writing>>;
    addWriting(header: MeInputDto, payload: WritingCreateDto): Promise<OutputDto<WritingCreateOutputDto>>;
    deleteWriting(header: MeInputDto, payload: WritingDeleteDto): Promise<OutputDto<Writing>>;
}
