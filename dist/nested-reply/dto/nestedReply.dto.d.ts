import { PaginationDto } from 'src/commons/dtos';
export declare class CreateNestedReplyParams {
    replyNo: number;
    comment: string;
}
export declare class CreateNestedReplyHeaderParams {
    authorization: string;
}
export declare class NestedReplyListPagination extends PaginationDto {
    replyNo: number;
}
export declare class NestedHeaderDto extends CreateNestedReplyHeaderParams {
}
export declare class DeletedNestedReplyCrudDto {
    nestedReplyNo: number;
}
export declare class DeletedNestedReplyHeaderDto extends CreateNestedReplyHeaderParams {
}
