import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum CONSULT_CONSULT {
  '사업 제휴',
  '입지 문의',
  '입지 등록',
  '기타',
}

@Entity()
export class Consult extends CommonEntity {
  @Column({ type: 'varchar', length: 50, comment: '문의자 이름' })
  name: string;

  @Column({ type: 'varchar', length: 50, comment: '입점 문의 종류' })
  type: CONSULT_CONSULT;

  @Column({ type: 'varchar', length: 50, comment: '문의자 번호' })
  phone: string;

  @Column({ type: 'varchar', length: 9999, comment: '문의 내용' })
  detail: string;

  @Column({ type: 'boolean', comment: '문의 완료', default: false })
  isDone: boolean;

  @ManyToOne((_) => User, (user) => user.consult, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
