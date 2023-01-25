import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entitiy';
export class QuestionCrudDto {
  @IsString()
  name: string;

  user: User;
}
export class QuestionOutputCrudDto extends QuestionCrudDto {}
