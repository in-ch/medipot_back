import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminUser } from './entities/user.entitiy';

@Module({
    imports:[TypeOrmModule.forFeature([AdminUser])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
