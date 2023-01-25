import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from 'src/location/entities/location.entitiy';
import { AdminUser, User } from 'src/user/entities/user.entitiy';
import { Auth } from 'src/auth/entities/auth.entitiy';
import { Question } from 'src/question/entities/question.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [Location, AdminUser, User, Auth, Question], // db 들어가는 곳
    }),
  ],
})
export class TypeormModule {}
