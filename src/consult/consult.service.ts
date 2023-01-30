import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputDto } from 'src/commons/dtos';
import { Repository } from 'typeorm';
import {
  DoneConsultParams,
  DoneConsultResponse,
  SendConsultAddParams,
  SendConsultAddResponse,
} from './dto/consult.dto';
import { Consult } from './entities/consult.entitiy';

@Injectable()
export class ConsultService {
  constructor(@InjectRepository(Consult) private readonly consults: Repository<Consult>) {}

  /**
   * @param {SendConsultAddParams} params name, type, phone, detail
   * @description 문의를 등록해준다.
   * @return {OutputDto<SendConsultAddResponse>} 문의 등록 성공 여부 리턴
   * @author in-ch, 2023-01-30
   */
  async sendConsultAdd(params: SendConsultAddParams): Promise<OutputDto<SendConsultAddResponse>> {
    try {
      const { name, phone, type } = params;
      const CONSULT = await this.consults.findOne({
        where: {
          name,
          phone,
          type,
          isDone: false,
        },
      });
      if (Number(CONSULT?.no > 0)) {
        return {
          isDone: false,
          status: 410,
          error: '이미 신청이 완료되었습니다.',
        };
      }
      const NEW_CONSULT = await this.consults.create(params);
      await this.consults.save(NEW_CONSULT);
      return {
        isDone: true,
        status: 200,
      };
    } catch (e) {
      console.error(e);
      return {
        isDone: false,
        status: 400,
        error: `서버 에러가 발생하였습니다. send consult add error`,
      };
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
        },
      });
      CONSULT.isDone = true;
      await this.consults.save(CONSULT);
      return {
        isDone: true,
        status: 200,
        error: `수정이 완료되었습니다.`,
      };
    } catch (e) {
      console.error(e);
      return {
        isDone: false,
        status: 400,
        error: `서버 에러가 발생하였습니다. done consult add error`,
      };
    }
  }
}
