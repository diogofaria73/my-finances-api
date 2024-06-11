import { ListUsersUseCase } from '@/domain/user/use-cases/list-users-use-case';
import { UsersNotFoundErrorMessage } from '@/domain/user/utils/error/users-not-found-error-message';
import { HttpUserPresenter } from '@/infra/http/presenter/user/http-user-presenter';
import { BadRequestException, Controller, Get, NotFoundException } from '@nestjs/common';

@Controller('users')
export class ListUsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  @Get('list')
  async handle() {

    const result = await this.listUsersUseCase.execute();

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UsersNotFoundErrorMessage:
          throw new NotFoundException(error)
        default:
          throw new BadRequestException(error)
      }
    }

    const users = result.value.user;

    return { users: users.map(HttpUserPresenter.toHTTPResponse)}
  }
}
