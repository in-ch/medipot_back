import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Chat extends CommonEntity {
  @Column({ type: 'varchar', length: 1050, comment: '메시지 내용' })
  message: string;

  @ManyToOne((_) => User, (user) => user.from_chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: User; // 채팅을 보낸 유저

  @ManyToOne((_) => User, (user) => user.to_chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_user_id' })
  toUser: User; // 채팅을 받은 유저
}
