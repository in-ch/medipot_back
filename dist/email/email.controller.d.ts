import { SendEmailParams } from './dto/email.dto';
import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(params: SendEmailParams): Promise<{
        data: boolean;
        statusCode: number;
    }>;
}
