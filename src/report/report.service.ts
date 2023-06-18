import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entitiy';
import { JwtService } from '@nestjs/jwt';
import { Writing } from 'src/writing/entities/writing';
import {
  NestedReportHeaderDto,
  NestedReportReplyCrudDto,
  ReportCrudDto,
  ReportHeaderDto,
  ReportReplyCrudDto,
} from './dto/report.dto';
import { OutputDto } from 'src/commons/dtos';
import { Report } from './entities/report.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { NotionService } from 'src/utills/notion/notion.service';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Writing) private readonly writings: Repository<Writing>,
    @InjectRepository(Reply) private readonly replys: Repository<Reply>,
    @InjectRepository(NestedReply) private readonly nestedReplys: Repository<NestedReply>,
    @InjectRepository(Report) private readonly reports: Repository<Report>,
    private readonly jwtService: JwtService,
    private readonly notionService: NotionService,
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
      this.notionService.notionInsertReport({
        contentId: Writing.no.toString(),
        tag: '글 신고',
        reportUserName: User_report.nickname,
        reportedUserName: Writing.user.nickname,
        detail: Writing.text,
      });
      return {
        statusCode: 200,
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

      this.notionService.notionInsertReport({
        contentId: Reply.no.toString(),
        tag: '댓글 신고',
        reportUserName: User_report.nickname,
        reportedUserName: Reply.user.nickname,
        detail: Reply.comment,
      });

      return {
        statusCode: 200,
      };
    } catch (e) {
      console.error(`createReplyReport API Error: ${e}`);
      throw e;
    }
  }

  /**
   * @param { NestedReportReplyCrudDto } payload nestedReplyNo: number
   * @param { NestedReportHeaderDto } header
   * @description ㄷㅐ댓글 신고 기능
   * @return {OutputDto<boolean>}
   * @author in-ch, 2023-05-08
   */
  async createNestedReplyReport(
    payload: NestedReportReplyCrudDto,
    header: NestedReportHeaderDto,
  ): Promise<OutputDto<boolean>> {
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;
    try {
      const { nestedReplyNo } = payload;
      const User_nested_report = await this.users.findOne({
        where: {
          no,
        },
      });
      const NestedReply = await this.nestedReplys.findOne({
        where: {
          no: nestedReplyNo,
        },
        relations: ['user'],
      });

      this.reports.save(
        this.reports.create({
          user_report: User_nested_report,
          user_reported: NestedReply.user,
          nestedReply: NestedReply,
        }),
      );

      this.notionService.notionInsertReport({
        contentId: NestedReply.no.toString(),
        tag: '대댓글 신고',
        reportUserName: User_nested_report.nickname,
        reportedUserName: NestedReply.user.nickname,
        detail: NestedReply.comment,
      });

      return {
        statusCode: 200,
      };
    } catch (e) {
      console.error(`createNestedReplyReport API Error: ${e}`);
      throw e;
    }
  }
}
