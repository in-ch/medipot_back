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

import { Like } from 'src/like/entities/like.entitiy';
import { User } from 'src/user/entities/user.entitiy';

@Entity()
export class Writing extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

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

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
