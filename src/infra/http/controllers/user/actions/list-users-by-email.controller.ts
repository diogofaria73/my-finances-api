import { ListUsersByEmailUseCase } from "@/domain/user/use-cases/list-users-by-email-use-case";
import { UsersNotFoundErrorMessage } from "@/domain/user/utils/error/users-not-found-error-message";
import { ZodValidationPipe } from "@/infra/http/pipes/validations/zod-validation-pipe";
import { BadRequestException, Body, Controller, NotFoundException, Post, UseGuards, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { JwtAuthGuard } from "../../authentication/jwt-auth-guard";

const listUsersByEmailBodySchema = z.object({
   email: z.string().email()
});

type ListUsersByEmailBodySchema = z.infer<typeof listUsersByEmailBodySchema>;

@Controller('users')
@UsePipes(new ZodValidationPipe(listUsersByEmailBodySchema))
@UseGuards(JwtAuthGuard)
export class ListUsersByEmailController {
   constructor(private readonly listUsersByEmailUseCase: ListUsersByEmailUseCase) {}

   @Post('list-by-email')
   async handle(@Body() body: ListUsersByEmailBodySchema) {

      const { email } = body;

      const result = await this.listUsersByEmailUseCase.execute(email);

      if(result.isLeft()){
         const error = result.value

         switch(error.constructor){
            case UsersNotFoundErrorMessage:
               throw new NotFoundException(error)
            default:
               throw new BadRequestException(error)
         }
      }

      return result.value
   }
}