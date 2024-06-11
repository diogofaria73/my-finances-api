import { Either, left, right } from "@/core/either";
import { Body, Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import { IUsersRepository } from "../contracts/users-repository";


type ListUsersByEmailResponse = Either<
'User not found. Please, try again later.',
{
   user: User
}
>

@Injectable()
export class ListUsersByEmailUseCase {
   constructor(private readonly usersRepository: IUsersRepository) { }

   async execute(email: string): Promise<ListUsersByEmailResponse> {
      const usersFromPrisma = await this.usersRepository.findByEmail(email);

      if(usersFromPrisma)
         return right({ user:usersFromPrisma });

      return left('User not found. Please, try again later.');
   }
}