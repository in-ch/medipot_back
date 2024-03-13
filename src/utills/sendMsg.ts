const coolsms = require('coolsms-node-sdk').default;

/**
 * @param {string} to 수신번호
 * @param {string} msg 메시지 내용
 * @description 슬랙에 메시지를 보낸다.
 * @return void
 */
const sendMsg = (to: string, msg: string): boolean => {
  const messageService = new coolsms(process.env.COOL_SMS_API_KEY, process.env.COOL_SMS_API_SECRET);
  return messageService
    .sendOne({
      to,
      from: process.env.SEND_NUMBER,
      text: msg,
    })
    .then((res) => {
      const { statusCode } = res;
      return statusCode === '2000';
    });
};

export default sendMsg;
