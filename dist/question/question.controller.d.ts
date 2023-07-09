import { Request } from 'express';
import { OutputDto } from 'src/commons/dtos';
import { QuestionCrudDto, QuestionHeaderDto, QuestionListPagination, QuestionOutputCrudDto } from './dto/question';
import { Question } from './entities/question.entitiy';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    addDetail(payload: QuestionCrudDto, header: QuestionHeaderDto): Promise<OutputDto<QuestionOutputCrudDto>>;
    getQuestion(request: Request<QuestionListPagination>, header: QuestionHeaderDto): Promise<OutputDto<Question[]>>;
}
