import { PaginationDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
export declare class QuestionCrudDto {
    locationNo: number;
}
declare const QuestionOutputCrudDto_base: import("@nestjs/mapped-types").MappedType<Pick<QuestionCrudDto, "locationNo">>;
export declare class QuestionOutputCrudDto extends QuestionOutputCrudDto_base {
    user: User;
    location: Location;
}
export declare class QuestionHeaderDto {
    authorization: string;
}
export declare class QuestionListPagination extends PaginationDto {
}
export {};
