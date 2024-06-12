import { UpdateUserUseCase } from "@/domain/user/use-cases/update-user-use-case";
import { UserAlreadyExistsErrorMessage } from "@/domain/user/utils/error/user-already-exists-error-message";
import { ZodValidationPipe } from "@/infra/http/pipes/validations/zod-validation-pipe";
import { BadRequestException, Body, Controller, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { JwtAuthGuard } from "../../authentication/jwt-auth-guard";
import { HttpUserPresenter } from "@/infra/http/presenter/user/http-user-presenter";

const updateUserBodySchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      isActive: z.boolean()
})

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;


@Controller('users')
@UsePipes(new ZodValidationPipe(updateUserBodySchema))
@UseGuards(JwtAuthGuard)
export class UpdateUserController {

   constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

   @Put('update')
   async handle(@Body() body: UpdateUserBodySchema) {
      
      const { id, name, email, isActive } = body;

      //FIXME: Check reason of id change after update.
      const result = await this.updateUserUseCase.execute({
         id,
         name,
         email,
         isActive
      });

      if(result.isLeft()) {
         const error = result.value;

         switch(error.constructor) {
            case UserAlreadyExistsErrorMessage:
               throw new BadRequestException(error)
            default:
               throw new BadRequestException(error)
         }
      }

      return { user: HttpUserPresenter.toHTTPResponse(result.value.user )}

   }
}