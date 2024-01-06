import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Report } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';

@Entity()
export class Reply extends CommonEntity {
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

  totalCount?: number;
}
