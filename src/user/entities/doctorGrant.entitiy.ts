import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entitiy';

@Entity()
export class UserGrantRequest extends CommonEntity {
  @Column({ type: 'varchar', length: 30, comment: '의사면허증 링크' })
  license: string;

  @ManyToOne((_) => User, (user) => user.userGrantRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
