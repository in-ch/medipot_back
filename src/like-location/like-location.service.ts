import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmService } from 'src/alarm/alarm.service';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';

@Injectable()
export class LikeLocationService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}
}
