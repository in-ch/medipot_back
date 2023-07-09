import { CommonEntity } from 'src/commons/entities/common.entity';
import { Location } from 'src/location/entities/location.entitiy';
import { User } from 'src/user/entities/user.entitiy';
export declare class LikeLocation extends CommonEntity {
    user: User;
    location: Location;
}
