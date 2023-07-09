import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entitiy';
import { Auth } from './entities/auth.entitiy';
import { AuthEmailParams, EmailValidationOutput, EmailValidationParams, NicknameValidationParams, NicknameValidationResponse, sendPhoneValidationHeader, SendPhoneValidationParams, ValidationPhoneHeader, ValidationPhoneParams } from './dto/auth.dto';
import { EmailService } from 'src/email/email.service';
import { OutputDto } from 'src/commons/dtos';
import { JwtService } from '@nestjs/jwt';
import { AuthPhone } from './entities/auth-phone.entitiy';
export declare class AuthService {
    private readonly auths;
    private readonly authsPhone;
    private readonly users;
    private readonly emailServices;
    private readonly jwtService;
    constructor(auths: Repository<Auth>, authsPhone: Repository<AuthPhone>, users: Repository<User>, emailServices: EmailService, jwtService: JwtService);
    private makeSignature;
    sendAuthEmail(params: AuthEmailParams): Promise<{
        statusCode: number;
        message: string;
        data: {
            message: string;
        };
    }>;
    emailValidation(params: EmailValidationParams): Promise<OutputDto<EmailValidationOutput>>;
    nicknameValidation(params: NicknameValidationParams): Promise<OutputDto<NicknameValidationResponse>>;
    sendPhoneValidation(payload: SendPhoneValidationParams, header: sendPhoneValidationHeader): Promise<OutputDto<{
        ok: boolean;
    }>>;
    phoneValidation(payload: ValidationPhoneParams, header: ValidationPhoneHeader): Promise<OutputDto<{
        ok: boolean;
        phone?: string;
    }>>;
}
