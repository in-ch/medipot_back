export declare class AuthEmailParams {
    email: string;
}
export declare class AuthEmailOutput {
    message?: string;
}
declare const EmailValidationParams_base: import("@nestjs/mapped-types").MappedType<Pick<AuthEmailParams, "email">>;
export declare class EmailValidationParams extends EmailValidationParams_base {
    code: string;
}
export declare class NicknameValidationParams {
    nickname: string;
}
export declare class ValidationPhoneParams {
    code: string;
    phone: string;
}
export declare class ValidationPhoneHeader {
    authorization: string;
}
export declare class SendPhoneValidationParams {
    phone: string;
}
export declare class sendPhoneValidationHeader extends ValidationPhoneHeader {
}
export declare class NicknameValidationResponse {
}
export declare class EmailValidationOutput extends AuthEmailOutput {
}
export {};
