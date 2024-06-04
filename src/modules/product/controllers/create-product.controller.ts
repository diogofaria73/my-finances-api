import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/service/prisma.service';
import { z } from 'zod';

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('products')
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
