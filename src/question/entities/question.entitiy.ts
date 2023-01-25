import { userInfo } from 'os';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne((_) => User, (user) => user.question, { onDelete: 'CASCADE' })
  @Column({ type: 'varchar', length: 30, comment: '유저' })
  user: User;

  @ManyToOne((_) => Location, (location) => location.question, { onDelete: 'CASCADE' })
  @Column({ type: 'varchar', length: 30, comment: '입지' })
  location: Location;

  @Column({ comment: '삭제 여부', default: false })
  isDeleted: boolean;

  @Column({ comment: '답변 여부', default: false })
  isResponse: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
