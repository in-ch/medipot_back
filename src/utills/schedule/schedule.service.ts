import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { Alarm, ALARM_TYPE } from 'src/alarm/entities/alarm.entitiy';
import { User } from 'src/user/entities/user.entitiy';

/// 9시부터 24시까지 2시간 마다 실행
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Alarm) private readonly alarms: Repository<Alarm>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  // @Cron('0 */2 9-24 * * ', { timeZone: 'Asia/Seoul' })
  @Cron('10 * * * * *', { timeZone: 'Asia/Seoul' })
  async handleCron() {
    try {
      const ALARMS = await this.alarms
        .createQueryBuilder('alarm')
        .select('DISTINCT alarm.user_id', 'user_id')
        .where('alarm.deletedAt IS NULL')
        .getRawMany();

      ALARMS.map(async (ALARM) => {
        const count = await this.alarms
          .createQueryBuilder('alarm')
          .select('alarm.type', 'type')
          .addSelect('COUNT(*)', 'count')
          .where('alarm.user_id = :userId', { userId: ALARM.user_id })
          .andWhere('alarm.type IN (:...types)', {
            types: [
              ALARM_TYPE.chat,
              ALARM_TYPE.comment,
              ALARM_TYPE.commentToComment,
              ALARM_TYPE.like,
            ],
          })
          .groupBy('alarm.type')
          .getRawMany();

        const User = await this.users.findOne({
          where: {
            no: ALARM.user_id,
          },
          select: ['nickname'],
        });

        console.log(
          `${User.nickname}님! 2시간 동안 총 ${count[0]?.count || 0}개의 좋아요, ${
            count[1]?.count || 0
          }개의 댓글, ${count[2]?.count || 0}개의 대댓글, ${
            count[3]?.count || 0
          }개의 채팅을 받으셨습니다.`,
        );

        await this.alarms.delete({ user: { no: ALARM.user_id } });
      });
    } catch (e) {
      console.error(`Alarm API Error : ${e}`);
    }
  }
}
