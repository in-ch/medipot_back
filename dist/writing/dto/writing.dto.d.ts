import { PaginationDto } from 'src/commons/dtos';
export declare class Writing {
    title: string;
    text: string;
    tags: string[];
    imgs: string[];
}
export declare class WritingCreateDto extends Writing {
}
export declare class WritingCreateOutputDto extends Writing {
}
export declare class WritingListDto extends PaginationDto {
    tag?: string;
    userNo?: number;
    text?: string;
}
export declare class WritingDetailDto {
    no?: number;
}
export declare class WritingDeleteDto {
    writingNo?: number;
}
