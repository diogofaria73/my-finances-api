import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/service/prisma.service';

@Controller('products')
export class ListProductsController {
  constructor(private prisma: PrismaService) {}

  @Get('/list')
  async handle() {
    const products = await this.prisma.product.findMany();

    return { products };
  }
}
