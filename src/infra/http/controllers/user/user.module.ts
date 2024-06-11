import { Module } from '@nestjs/common';
import { CreateUserController } from './actions/create-user.controller';
import { ListUsersController } from './actions/list-users.controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user-use-case';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/concrete/user/prisma-users-repository';
import { IUsersRepository } from '@/domain/user/contracts/users-repository';
import { ListUsersUseCase } from '@/domain/user/use-cases/list-users-use-case';
import { ListUsersByEmailController } from './actions/list-users-by-email.controller';
import { ListUsersByEmailUseCase } from '@/domain/user/use-cases/list-users-by-email-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: 
  [
    CreateUserController, 
    ListUsersController,
    ListUsersByEmailController
  ],
  providers: 
  [
    CreateUserUseCase, 
    ListUsersUseCase,
    ListUsersByEmailUseCase,
    PrismaUsersRepository, 
    { 
      provide: IUsersRepository, 
      useClass: PrismaUsersRepository
    }
  ],
})
export class UserModule {}
