import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entitiy';

@Entity()
export class UserGrantRequest extends CommonEntity {
  @Column({ type: 'varchar', length: 999, comment: '의사면허증 링크' })
  license: string;

  @ManyToOne((_) => User, (user) => user.userGrantRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'boolean', comment: '처리 완료 여부', default: false })
  isDone: boolean;
}
