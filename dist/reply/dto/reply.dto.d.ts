import { PaginationDto } from 'src/commons/dtos';
export declare class ReplyCrudDto {
    writingNo: number;
    comment: string;
}
export declare class ReplyHeaderDto {
    authorization: string;
}
export declare class ReplyPaginationDto extends PaginationDto {
    writingNo: number;
    page: number;
    limit: number;
}
export declare class ReplyDeleteDto {
    replyNo: number;
}
export declare class TotalCountDto {
    writingNo: number;
}
