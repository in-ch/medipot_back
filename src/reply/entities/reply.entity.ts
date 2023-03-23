import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Report } from 'src/report/entities/report.entity';
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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne((_) => User, (user) => user.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((_) => Writing, (writing) => writing.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'writing_id' })
  writing: Writing;

  @OneToMany((_) => Report, (report) => report.reply)
  reported: Report[];

  @Column({ type: 'varchar', length: 250, comment: '댓글' })
  comment: string;

  @OneToMany((_) => NestedReply, (nestedReply) => nestedReply.reply)
  nestedReply: NestedReply[];

  @Column({ type: 'boolean', comment: '삭제 여부', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
