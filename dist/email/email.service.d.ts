import { SendEmailParams } from './dto/email.dto';
export declare class EmailService {
    sendEmail(params: SendEmailParams): Promise<{
        data: boolean;
        statusCode: number;
    }>;
}
