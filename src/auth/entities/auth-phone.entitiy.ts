import { CommonEntity } from 'src/commons/entities/common.entity';
import { User } from 'src/user/entities/user.entitiy';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class AuthPhone extends CommonEntity {
  @ManyToOne((_) => User, (user) => user.authPhone, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 50, comment: '인증 코드' })
  code: string;
}
