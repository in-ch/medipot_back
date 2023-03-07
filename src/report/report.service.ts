import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entitiy';
import { Location } from 'src/location/entities/location.entitiy';
import { JwtService } from '@nestjs/jwt';
import { Writing } from 'src/writing/entities/writing';
import { ReportCrudDto, ReportHeaderDto } from './dto/report.dto';
import { OutputDto } from 'src/commons/dtos';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(Report) private readonly reports: Repository<Report>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param { ReportCrudDto } payload
   * @param { ReportHeaderDto } header
   * @description 글 신고 기능
   * @return {OutputDto<boolean>}
   * @author in-ch, 2023-03-07
   */
  async create(payload: ReportCrudDto, header: ReportHeaderDto): Promise<OutputDto<boolean>> {
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const { writingNo } = payload;
      const User_report = await this.users.findOne({
        where: {
          no,
        },
      });
      const Writing = await this.writings.findOne({
        where: {
          no: writingNo,
        },
        relations: ['user'],
      });

      this.reports.save(
        this.reports.create({
          user_report: User_report,
          user_reported: Writing.user,
          writing: Writing,
        }),
      );
      return {
        isDone: true,
        status: 400,
      };
    } catch (e) {
      return {
        isDone: false,
        status: 400,
        error: `오류가 발생하였습니다. ${e}`,
      };
    }
  }
}
