import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';

/// comment: 내가 쓴 글에 댓글이 달림.
/// commentToComment: 내가 쓴 댓글에 대댓글이 달림.
/// like: 내가 쓴 글에 댓글이 달림.
/// chat: 나한테 채팅이 옴.
export enum ALARM_TYPE {
  comment = 'COMMENT',
  commentToComment = 'COMMENT_TO_COMMENT',
  like = 'LIKE',
  chat = 'CHAT',
}

@Entity()
export class Alarm extends CommonEntity {
  @ApiProperty()
  @ManyToOne((_) => User, (user) => user.from_chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Column({ comment: '알림 유형' })
  type: ALARM_TYPE;
}
