export declare enum LOGIN_REGISTER_TYPE {
    register = "REGISTER",
    login = "LOGIN"
}
export declare class OutputDto<T> {
    statusCode: number;
    error?: string;
    message?: string;
    data?: T;
    totalCount?: number;
    type?: string;
}
export declare class PageOutput<T> {
    page: number;
    totalCount?: number;
    list: T;
}
