import { PickType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entitiy';
export class QuestionCrudDto {
  @IsNumber()
  locationNo: number;
}
export class QuestionOutputCrudDto extends PickType(QuestionCrudDto, ['locationNo']) {
  user: User;

  location: Location;
}

export class QuestionHeaderDto {
  @IsString()
  authorization: string;
}
