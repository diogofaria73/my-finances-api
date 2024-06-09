import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../../../pipes/validations/zod-validation-pipe';
import { z } from 'zod';
import { PrismaService } from '@/infra/database/prisma.service';
import { hash } from 'bcryptjs';

const createUserBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6).max(100),
  isActive: z.boolean()
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('users')
@UsePipes(new ZodValidationPipe(createUserBodySchema))
export class CreateUserController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('/create')
  async handle(@Body() body: CreateUserBodySchema) {
    const { email, name, password, isActive } = body;

    const emailAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isActive
      },
    });

    return { user };
  }
}
