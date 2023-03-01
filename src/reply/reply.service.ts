import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import { Repository } from 'typeorm';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    private readonly jwtService: JwtService,
  ) {}
}
