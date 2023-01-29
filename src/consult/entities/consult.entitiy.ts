import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum CONSULT_CONSULT {
  '사업 제휴',
  '입지 문의',
  '입지 등록',
  '기타',
}

@Entity()
export class Consult extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar', length: 50, comment: '문의자 이름' })
  name: string;

  @Column({ type: 'varchar', length: 50, comment: '입점 문의 종류' })
  type: CONSULT_CONSULT;

  @Column({ type: 'varchar', length: 50, comment: '문의자 번호' })
  phone: string;

  @Column({ type: 'varchar', length: 50, comment: '문의 내용' })
  detail: string;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
