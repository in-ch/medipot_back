import { CommonEntity } from 'src/commons/entities/common.entity';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Question extends CommonEntity {
  @ManyToOne((_) => User, (user) => user.question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((_) => Location, (location) => location.question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ comment: '답변 여부', default: false })
  isResponse: boolean;
}
