import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { OutputDto } from 'src/commons/dtos';
import { User } from 'src/user/entities/user.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import sendSlackMsg from 'src/utills/sendSlackMsg';
import {
  ConsultListHeaders,
  ConsultListPagination,
  DoneConsultParams,
  DoneConsultResponse,
  SendConsultAddHeaders,
  SendConsultAddParams,
  SendConsultAddResponse,
} from './dto/consult.dto';
import { Consult } from './entities/consult.entitiy';

@Injectable()
export class ConsultService {
  constructor(
    @InjectRepository(Consult) private readonly consults: Repository<Consult>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly notionService: NotionService,
  ) {}

  async list(
    query: ConsultListPagination,
    header: ConsultListHeaders,
  ): Promise<OutputDto<Consult[]>> {
    try {
      const { page, limit } = query;
      const { authorization } = header;
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;

      const consults = await this.consults.find({
        take: limit || 10,
        skip: page * limit || 0,
        where: {
          user: {
            no,
          },
          deletedAt: IsNull(),
        },
        relations: ['user'],
        loadRelationIds: true,
      });
      const totalCount = consults.length;
      return {
        totalCount,
        statusCode: 200,
        data: consults,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * @param {SendConsultAddParams} params name, type, phone, detail
   * @param {SendConsultAddHeaders} header authorization
   * @description 문의를 등록해준다.
   * @return {OutputDto<SendConsultAddResponse>} 문의 등록 성공 여부 리턴
   * @author in-ch, 2023-01-30
   */
  async sendConsultAdd(
    params: SendConsultAddParams,
    header: SendConsultAddHeaders,
  ): Promise<OutputDto<SendConsultAddResponse>> {
    try {
      const { name, phone, type } = params;
      const { authorization } = header;

      const CONSULT = await this.consults.findOne({
        where: {
          name,
          phone,
          type,
          isDone: false,
          deletedAt: IsNull(),
        },
      });
      if (Number(CONSULT?.no > 0)) {
        throw new ConflictException(
          `이미 신청이 완료되었습니다. 이미 신청된 상담 no ${CONSULT?.no}`,
        );
      }
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;
      const User = await this.users.findOne({
        where: {
          no,
        },
      });
      const NEW_CONSULT = await this.consults.create({
        ...params,
        user: User,
      });
      await this.consults.save(NEW_CONSULT);

      await this.notionService.notionInsertConsult({
        name: NEW_CONSULT.name,
        type: NEW_CONSULT.type.toString(),
        userName: NEW_CONSULT.user.nickname,
        detail: NEW_CONSULT.detail,
        phone: NEW_CONSULT.phone,
      });

      sendSlackMsg(
        process.env.SLACK_WEBHOOK_HOMEPAGE_CONSULT_REQUEST,
        `${NEW_CONSULT.name} 님의 홈페이지 문의입니다.`,
        `
이름: ${NEW_CONSULT.name}
종류: ${NEW_CONSULT.type.toString()}
유저 이름: ${NEW_CONSULT.user.nickname}
상세 내용: 
${NEW_CONSULT.detail}

연락처: ${NEW_CONSULT.phone}
      `,
      );

      return {
        statusCode: 200,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * @param {DoneConsultParams} params no
   * @description 문의를 완료로 수정해준다.
   * @return {OutputDto<DoneConsultResponse>} 문의 수정 성공 여부 리턴
   * @author in-ch, 2023-01-30
   */
  async doneConsult(params: DoneConsultParams): Promise<OutputDto<DoneConsultResponse>> {
    try {
      const { no } = params;
      const CONSULT = await this.consults.findOne({
        where: {
          no,
          isDone: false,
          deletedAt: IsNull(),
        },
      });
      CONSULT.isDone = true;
      await this.consults.save(CONSULT);
      return {
        statusCode: 200,
        message: `수정이 완료되었습니다.`,
        data: CONSULT,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
