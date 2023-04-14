import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Like } from 'src/like/entities/like.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Reply } from 'src/reply/entities/reply.entity';
import { Report } from 'src/report/entities/report.entity';
import { CommonEntity } from 'src/commons/entities/common.entity';

@Entity()
export class Writing extends CommonEntity {
  @Column({ comment: '글 제목' })
  title: string;

  @Column({ comment: '글 내용' })
  text: string;

  @Column('text', { array: true, comment: '글 태그들' })
  tags: string[];

  @Column('text', { array: true, comment: '이미지들' })
  imgs: string[];

  @ManyToOne((_) => User, (user) => user.writing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((_) => Like, (like) => like.writing)
  like: Like[];

  @OneToMany((_) => Reply, (reply) => reply.writing)
  reply: Reply[];

  @OneToMany((_) => Report, (report) => report.writing)
  reported: Report[];
}
