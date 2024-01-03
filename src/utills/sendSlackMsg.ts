import { IncomingWebhook } from '@slack/client';
/**
 * @param token webhook 토큰값
 * @param title 메시지 제목
 * @param msg 메시지 내용
 * @description 슬랙에 메시지를 보낸다.
 * @return void
 */
const sendSlackMsg = (token: string, title: string, msg: string): void => {
  const webhook = new IncomingWebhook(token);
  webhook.send({
    attachments: [
      {
        color: 'good',
        text: '',
        fields: [
          {
            title: title,
            value: msg,
            short: false,
          },
        ],
        ts: Math.floor(new Date().getTime() / 1000).toString(), // unix form
      },
    ],
  });
};

export default sendSlackMsg;
