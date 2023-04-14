import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Chat extends CommonEntity {
  @Column({ type: 'varchar', length: 1050, comment: '메시지 내용' })
  message: string;

  @ManyToOne((_) => User, (user) => user.consult, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
