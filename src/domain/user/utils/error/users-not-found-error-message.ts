import { UseCaseError } from '@/core/errors/use-case-error'

export class UsersNotFoundErrorMessage extends Error implements UseCaseError {
  constructor() {
    super('Users not found. Please, try again later.')
  }
}
