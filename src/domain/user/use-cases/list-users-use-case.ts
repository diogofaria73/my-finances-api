import { Either, left, right } from "@/core/either";
import { IUsersRepository } from "../contracts/users-repository";
import { User } from "../entities/user";
import { Injector } from "@nestjs/core/injector/injector";
import { Injectable } from "@nestjs/common";


type ListUsersResponse = Either<
  'Users not found. Please, try again later.',
  {
    user: User[]
  }
>

@Injectable()
export class ListUsersUseCase {
   constructor(private readonly usersRepository: IUsersRepository) { }

   async execute(): Promise<ListUsersResponse> {
      const usersFromPrisma = await this.usersRepository.findAll();

      // if(!usersFromPrisma)
      //    return left('Users not found. Please, try again later.');

      // return right({ user: usersFromPrisma });

      if(usersFromPrisma)
         return right({ user:usersFromPrisma });

      return left('Users not found. Please, try again later.');
      
   }
}