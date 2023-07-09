import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
import { AddAlaramPayload } from './dto/alarm.dto';
import { Alarm } from './entities/alarm.entitiy';
export declare class AlarmService {
    private readonly alarms;
    private readonly users;
    constructor(alarms: Repository<Alarm>, users: Repository<User>);
    addAlarm(payload: AddAlaramPayload): Promise<void>;
}
