import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum grant {
  'ADMIN',
  'USER',
}

@Entity()
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar', length: 30, comment: '아이디' })
  id: string;

  @Column({ comment: '패스워드', select: false })
  password: string;

  @Column({ comment: '유저 이름' })
  name: string;

  @Column({ enum: grant, type: 'enum', name: 'grant', comment: '권한', select: false })
  grant: grant;

  @Column({ comment: '엑세스 토큰', default: '', select: false })
  token?: string;

  @Column({ comment: '리프레쉬 토큰', default: '', select: false })
  refresh_token?: string;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
