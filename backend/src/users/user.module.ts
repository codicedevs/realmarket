import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UserModule {}

//ANTES ESTABA ASI

//@Module({
//   imports: [DatabaseModule],
//   providers: [
//     ...userProviders,
//     UsersService,
//   ],
// })
// export class UserModule {}
