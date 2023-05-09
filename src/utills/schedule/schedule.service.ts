import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

/// 9시부터 24시까지 2시간 마다 실행
@Injectable()
export class ScheduleService {
  constructor() {}
  @Cron('0 */2 9-24 * * ', { timeZone: 'Asia/Seoul' })
  handleCron() {
    console.log('매분 30초마다 실행됩니다.');
  }
}
