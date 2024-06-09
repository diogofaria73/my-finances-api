import { PrismaService } from '@/infra/database/prisma.service';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../../pipes/validations/zod-validation-pipe';
import { JwtAuthGuard } from '../../authentication/jwt-auth-guard';
import { CreateProductUseCase } from '@/domain/product/use-cases/create-product-use-case';

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isAvailable: z.boolean()
});

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('products')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(createProductBodySchema))
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('/create')
  async handle(@Body() body: CreateProductBodySchema) {
    const { name, description, price, isAvailable } = body;

    const product = await this.createProductUseCase.execute({name, description, price, isAvailable})

    return product;
  }
}
