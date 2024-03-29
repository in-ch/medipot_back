import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { OutputDto } from 'src/commons/dtos';
import { Question } from './entities/question.entitiy';
import { User, UserGrant } from 'src/user/entities/user.entitiy';
import { Location } from 'src/location/entities/location.entitiy';
import { NotionService } from 'src/utills/notion/notion.service';
import sendSlackMsg from 'src/utills/sendSlackMsg';
import {
  QuestionCrudDto,
  QuestionHeaderDto,
  QuestionListPagination,
  QuestionOutputCrudDto,
} from './dto/question';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private readonly questions: Repository<Question>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Location) private readonly locations: Repository<Location>,
    private readonly jwtService: JwtService,
    private readonly notionService: NotionService,
  ) {}

  async addDetail(
    payload: QuestionCrudDto,
    header: QuestionHeaderDto,
  ): Promise<OutputDto<QuestionOutputCrudDto>> {
    const { locationNo } = payload;
    const { authorization } = header;
    const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
      secret: process.env.PRIVATE_KEY,
    });
    const { no } = UnSignToken;

    try {
      const user = await this.users.findOne({
        where: {
          no,
        },
        select: ['no', 'nickname', 'phone', 'grant'],
      });
      if (!user.no) {
        throw new NotFoundException(
          `유저 인증에 실패했습니다. 유저 no: ${user?.no} 입지 no: ${locationNo}`,
        );
      }
      // else if (user.grant !== UserGrant.DOCTOR) {
      //   return {
      //     statusCode: 406,
      //   };
      // }
      else {
        const location = await this.locations.findOne({
          where: {
            no: locationNo,
          },
          relations: ['user'],
          select: ['no', 'address'],
        });
        if (!location.no) {
          throw new NotFoundException(
            `삭제된 매물입니다. 유저 no: ${user?.no} 입지 no: ${locationNo}`,
          );
        }
        const locationUser = await this.users.findOne({
          where: {
            no: location.user.no,
          },
          select: ['no', 'phone', 'nickname'],
        });
        const newQuestion = {
          user,
          location,
          userNo: no,
          locationNo,
          locationUser,
        };
        this.questions.save(this.questions.create(newQuestion));

        await this.notionService.notionInsertQuestion({
          name: user.nickname,
          phone: user.phone,
          location: location.address,
          locationUser: locationUser.nickname,
          locationPhone: '미정',
        });

        sendSlackMsg(
          process.env.SLACK_WEBHOOK_PREMIUM_REPORT_REQUEST,
          `${user.nickname} 님의 요청입니다.`,
          `
  이름: ${user.nickname}
  연락처: ${user.phone}
  요청 주소: ${location.address}
  요청 입지 등록 유저명: ${locationUser.nickname}
  해당 입지: https://medi-pots.com/location/detail/${location.no}
        `,
        );

        return {
          statusCode: 200,
        };
      }
    } catch (e) {
      console.error(`Add Question API Error: ${e}`);
      throw e;
    }
  }

  async getQuestions(
    query: QuestionListPagination,
    header: QuestionHeaderDto,
  ): Promise<OutputDto<Question[]>> {
    const { limit, page } = query;
    const { authorization } = header;
    try {
      const UnSignToken = await this.jwtService.verify(authorization.replace('Bearer ', ''), {
        secret: process.env.PRIVATE_KEY,
      });
      const { no } = UnSignToken;

      const questions = await this.questions.find({
        take: limit || 10,
        skip: page * limit || 0,
        where: {
          user: {
            no,
          },
        },
        relations: ['location'],
      });

      const totalCount = questions.length;

      return {
        totalCount,
        statusCode: 200,
        data: questions.filter((question) => question?.location !== null),
      };
    } catch (e) {
      console.error(`getQuestions API Error: ${e}`);
      throw e;
    }
  }
}
