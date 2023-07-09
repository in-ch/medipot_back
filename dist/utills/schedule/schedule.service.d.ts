import { Alarm } from 'src/alarm/entities/alarm.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Repository } from 'typeorm';
export declare class ScheduleService {
    private readonly alarms;
    private readonly users;
    constructor(alarms: Repository<Alarm>, users: Repository<User>);
    handleCron(): Promise<void>;
}
