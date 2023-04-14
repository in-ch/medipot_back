import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Auth extends CommonEntity {
  @Column({ type: 'varchar', length: 50, comment: '이메일 주소' })
  email: string;

  @Column({ type: 'varchar', length: 50, comment: '인증 코드' })
  code: string;
}
