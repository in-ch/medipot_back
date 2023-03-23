import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne((_) => User, (user) => user.report, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_report_id' })
  user_report: User;

  @ManyToOne((_) => User, (user) => user.reported, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_reported_id' })
  user_reported: User;

  @ManyToOne((_) => Writing, (writing) => writing.reported, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'writing_id' })
  writing: Writing;

  @ManyToOne((_) => Reply, (reply) => reply.reported, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reply_id' })
  reply: Reply;

  @ManyToOne((_) => NestedReply, (nestedReply) => nestedReply.reported, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nestedReply_id' })
  nestedReply: NestedReply;

  @Column({ type: 'boolean', comment: '처리 여부', default: false })
  isProcessing: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
