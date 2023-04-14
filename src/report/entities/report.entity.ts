import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';
import { NestedReply } from 'src/nested-reply/entities/nestedReply.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';

@Entity()
export class Report extends CommonEntity {
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
}
