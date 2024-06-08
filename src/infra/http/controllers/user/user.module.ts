import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { ListUsersController } from './list-users.controller';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, ListUsersController],
  providers: [],
})
export class UserModule {}
