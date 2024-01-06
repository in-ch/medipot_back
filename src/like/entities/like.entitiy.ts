import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Writing } from 'src/writing/entities/writing';

@Entity()
export class Like extends CommonEntity {
  @ManyToOne((_) => User, (user) => user.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((_) => Writing, (writing) => writing.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'writing_id' })
  writing: Writing;
}
