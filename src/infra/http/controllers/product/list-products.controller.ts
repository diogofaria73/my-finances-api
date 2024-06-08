import { PrismaService } from '@/infra/database/service/prisma.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ListProductsController {
  constructor(private prisma: PrismaService) {}

  @Get('/list')
  async handle() {
    const products = await this.prisma.product.findMany();

    return { products };
  }
}
