import { Body, Injectable } from "@nestjs/common";
import { IUsersRepository } from "../contracts/users-repository";
import { User } from "../entities/user";
import { Either, left, right } from "@/core/either";

interface UpdateUserUseCaseRequest {
   id: string;
   name: string;
   email: string;
   isActive: boolean;

}

type UpdateUserUseCaseResponse = Either<
   'An error occurred while trying to update user data. Please, try again later',
   {
      user: User
   }
>

@Injectable()
export class UpdateUserUseCase {
   constructor(private readonly userRepository: IUsersRepository) { }

   async execute(@Body() body:  UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
     
      const { id, name, email, isActive } = body;

      const user = await this.userRepository.findById(id);

      if(!user)
         return left('An error occurred while trying to update user data. Please, try again later');

      const user_new = await this.userRepository.update(
         id, 
         User.create({
            name, 
            email,
            isActive,
            password: user.password}) as User); 
      
      if(!user_new)
         return left('An error occurred while trying to update user data. Please, try again later');

      return right({ user: user_new });

   }
}