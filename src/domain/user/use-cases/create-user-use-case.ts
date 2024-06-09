import { Injectable } from "@nestjs/common";
import { Either, left, right } from '@/core/either'
import { User } from "../entities/user";
import { IUsersRepository } from "../contracts/users-repository";
import { hash } from "bcryptjs";

interface CreateUserUseCaseRequest {
   name: string;
   email: string;
   password: string;
   isActive: boolean;
}

type CreateUserUseCaseResponse = Either<
  'Email already exists. Please, try again with a different email',
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
   constructor(
      private readonly usersRepository: IUsersRepository
   ) { }

    async execute({name, email, password, isActive}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
       
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) 
         return left(`Email already exists. Please, try again with a different email`)
      
      const hashPassword = await hash(password, 8)

     const user = User.create({
         name: name,
         email: email,
         password: hashPassword,
         isActive: isActive
      })

      await this.usersRepository.save(user);

      return right({ user });
    }
}