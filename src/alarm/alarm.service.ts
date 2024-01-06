import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';

import { AddAlaramPayload } from './dto/alarm.dto';
import { Alarm } from './entities/alarm.entitiy';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm) private readonly alarms: Repository<Alarm>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  /**
   * @param payload {AddAlaramPayload}
   * @description 알람을 등록해준다.
   * @author in-ch, 2023-05-09
   */
  async addAlarm(payload: AddAlaramPayload) {
    try {
      const User = await this.users.findOne({
        where: {
          no: payload.userNo,
        },
      });
      this.alarms.save(
        this.alarms.create({
          user: User,
          type: payload.type,
        }),
      );
    } catch (e) {
      console.error(`Create Alarm Error ${e}`);
    }
  }
}
