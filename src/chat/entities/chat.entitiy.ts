import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum MESSAGE_TYPE {
  message = 'MESSAGE',
  image = 'IMAGE',
}

@Entity()
export class Chat extends CommonEntity {
  @Column({ type: 'varchar', length: 1050, comment: '메시지 내용', nullable: true })
  message: string;

  @Column({ type: 'varchar', comment: '이미지 타입', nullable: true })
  img: string;

  @Column({ type: 'boolean', comment: '채팅 메시지를 읽었는지 여부', default: false })
  isRead: boolean;

  @Column({ type: 'varchar', comment: '메시지 타입' })
  type: MESSAGE_TYPE;

  @ManyToOne((_) => User, (user) => user.from_chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: User; // 채팅을 보낸 유저

  @ManyToOne((_) => User, (user) => user.to_chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_user_id' })
  toUser: User; // 채팅을 받은 유저
}
