export declare class NotionInsertLocationParams {
    name: string;
    address: string;
    keywords: string[];
    departments: string[];
    userName: string;
}
export declare class NotionInsertConsultParams {
    name: string;
    type: string;
    detail: string;
    userName: string;
    phone: string;
}
export declare class NotionInsertReportParams {
    contentId: string;
    tag: string;
    reportUserName: string;
    reportedUserName: string;
    detail: string;
}
export declare class NotionInsertQuestionParams {
    name: string;
    phone: string;
    location: string;
    locationUser: string;
    locationPhone: string;
}
export declare class NotionRequestGrantParams {
    name: string;
    license: string;
}
