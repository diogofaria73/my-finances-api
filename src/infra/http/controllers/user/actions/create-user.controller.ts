import { CreateUserUseCase } from '@/domain/user/use-cases/create-user-use-case';
import { BadRequestException, 
         Body, 
         ConflictException,
         Controller, 
         Post, 
         UsePipes } 
        from '@nestjs/common';
import { ZodValidationPipe } from '../../../pipes/validations/zod-validation-pipe';
import { z } from 'zod';
import { UserAlreadyExistsErrorMessage } from '@/domain/user/utils/error/user-already-exists-error-message';


const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('users')
@UsePipes(new ZodValidationPipe(createUserBodySchema))
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('create')
  async handle(@Body() body: CreateUserBodySchema) {

    const {name, email, password } = body;

    const result = await this.createUserUseCase.execute({
      name,
      email,
      password,
      isActive: true
    });

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsErrorMessage:
          throw new ConflictException(error)
        default:
          throw new BadRequestException(error)
      }
    }

    return result.value
  }
}
