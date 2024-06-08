import { PrismaService } from '@/infra/database/service/prisma.service';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/validations/zod-validation-pipe';
import { JwtAuthGuard } from '../authentication/jwt-auth-guard';

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('products')
// TODO: To use Auth Guard, uncomment the line below
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(createProductBodySchema))
export class CreateProductController {
  constructor(private prisma: PrismaService) {}

  @Post('/create')
  async handle(@Body() body: CreateProductBodySchema) {
    const { name, description, price } = body;

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });

    return { product };
  }
}
