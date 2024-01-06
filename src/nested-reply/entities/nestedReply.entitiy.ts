import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { Report } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entitiy';

@Entity()
export class NestedReply extends CommonEntity {
  @Column({ type: 'varchar', length: 250, comment: '댓글' })
  comment: string;

  @ManyToOne((_) => User, (user) => user.nestedReply, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((_) => Reply, (reply) => reply.nestedReply, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reply_id' })
  reply: Reply;

  @OneToMany((_) => Report, (report) => report.nestedReply)
  reported: Report[];
}
