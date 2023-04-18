import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entitiy';
import { Location } from 'src/location/entities/location.entitiy';
import { JwtService } from '@nestjs/jwt';
import { Writing } from 'src/writing/entities/writing';
import { ReportCrudDto, ReportHeaderDto, ReportReplyCrudDto } from './dto/report.dto';
import { OutputDto } from 'src/commons/dtos';
import { Report } from './entities/report.entity';
import { Reply } from 'src/reply/entities/reply.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
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
        statusCode: 400,
      };
    } catch (e) {
      console.error(`글 신고 API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param { ReportReplyCrudDto } payload replyNo: number
   * @param { ReportHeaderDto } header
   * @description 댓글 신고 기능
   * @return {OutputDto<boolean>}
   * @author in-ch, 2023-03-10
   */
  async createReplyReport(
    payload: ReportReplyCrudDto,
    header: ReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;
    try {
      const { replyNo } = payload;
      const User_report = await this.users.findOne({
        where: {
          no,
        },
      });
      const Reply = await this.replys.findOne({
        where: {
          no: replyNo,
        },
        relations: ['user'],
      });

      this.reports.save(
        this.reports.create({
          user_report: User_report,
          user_reported: Reply.user,
          reply: Reply,
        }),
      );
      return {
        statusCode: 200,
      };
    } catch (e) {
      console.error(`createReplyReport API Error: ${e}`);
      throw e;
    }
  }
}
