import { Module } from '@nestjs/common';
import { CreateUserController } from './actions/create-user.controller';
import { ListUsersController } from './actions/list-users.controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user-use-case';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/concrete/user/prisma-users-repository';
import { IUsersRepository } from '@/domain/user/contracts/users-repository';
import { ListUsersUseCase } from '@/domain/user/use-cases/list-users-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: 
  [
    CreateUserController, 
    ListUsersController
  ],
  providers: 
  [
    CreateUserUseCase, 
    ListUsersUseCase,
    PrismaUsersRepository, 
    { 
      provide: IUsersRepository, 
      useClass: PrismaUsersRepository
    }
  ],
})
export class UserModule {}
