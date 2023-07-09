import { Repository } from 'typeorm';
import { OutputDto } from 'src/commons/dtos';
import { Question } from './entities/question.entitiy';
import { QuestionCrudDto, QuestionHeaderDto, QuestionListPagination, QuestionOutputCrudDto } from './dto/question';
import { User } from 'src/user/entities/user.entitiy';
import { Location } from 'src/location/entities/location.entitiy';
import { JwtService } from '@nestjs/jwt';
import { NotionService } from 'src/utills/notion/notion.service';
export declare class QuestionService {
    private readonly questions;
    private readonly users;
    private readonly locations;
    private readonly jwtService;
    private readonly notionService;
    constructor(questions: Repository<Question>, users: Repository<User>, locations: Repository<Location>, jwtService: JwtService, notionService: NotionService);
    addDetail(payload: QuestionCrudDto, header: QuestionHeaderDto): Promise<OutputDto<QuestionOutputCrudDto>>;
    getQuestions(query: QuestionListPagination, header: QuestionHeaderDto): Promise<OutputDto<Question[]>>;
}
