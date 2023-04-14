import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailParams {
  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  html: string;
}
