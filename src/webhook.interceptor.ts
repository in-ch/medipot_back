import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { IncomingWebhook } from '@slack/client';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
        webhook.send({
          attachments: [
            {
              color: 'danger',
              text: '서버 에러 발생',
              fields: [
                {
                  title: `Request Message: ${error.message}`,
                  value: error.stack,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(), // unix form
            },
          ],
        });
        return null;
      }),
    );
  }
}
