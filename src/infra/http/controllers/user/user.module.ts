import { Module } from '@nestjs/common';
import { CreateUserController } from './actions/create-user.controller';
import { ListUsersController } from './actions/list-users.controller';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, ListUsersController],
  providers: [],
})
export class UserModule {}
