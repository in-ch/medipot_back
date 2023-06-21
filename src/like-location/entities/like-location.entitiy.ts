import { CommonEntity } from 'src/commons/entities/common.entity';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class LikeLocation extends CommonEntity {
  @ManyToOne((_) => User, (user) => user.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((_) => Location, (location) => location.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
