import { OutputDto } from 'src/commons/dtos';
import { AuthService } from './auth.service';
import { AuthEmailOutput, AuthEmailParams, EmailValidationOutput, EmailValidationParams, NicknameValidationParams, NicknameValidationResponse, sendPhoneValidationHeader, SendPhoneValidationParams, ValidationPhoneHeader, ValidationPhoneParams } from './dto/auth.dto';
export declare class AuthController {
    private readonly authsService;
    constructor(authsService: AuthService);
    sendAuthEmail(payload: AuthEmailParams): Promise<OutputDto<AuthEmailOutput>>;
    emailValidation(payload: EmailValidationParams): Promise<OutputDto<EmailValidationOutput>>;
    nicknameValidation(payload: NicknameValidationParams): Promise<OutputDto<NicknameValidationResponse>>;
    sendPhoneValidation(payload: SendPhoneValidationParams, header: sendPhoneValidationHeader): Promise<OutputDto<{
        ok: boolean;
    }>>;
    phoneValidation(payload: ValidationPhoneParams, header: ValidationPhoneHeader): Promise<OutputDto<{
        ok: boolean;
    }>>;
}
