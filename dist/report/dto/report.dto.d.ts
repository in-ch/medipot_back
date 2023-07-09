import { PaginationDto } from 'src/commons/dtos';
export declare class ReportCrudDto {
    writingNo: number;
}
export declare class ReportHeaderDto {
    authorization: string;
}
export declare class ReportListPagination extends PaginationDto {
}
export declare class ReportReplyCrudDto {
    replyNo: number;
}
export declare class NestedReportReplyCrudDto {
    nestedReplyNo: number;
}
export declare class NestedReportHeaderDto extends ReportHeaderDto {
}
