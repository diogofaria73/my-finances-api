import { ListAllProductsUseCase } from '@/domain/product/use-cases/find-all-products-use-case';
import { PrismaService } from '@/infra/database/prisma.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ListProductsController {
  constructor(private readonly listAllProductsUseCase: ListAllProductsUseCase) {}

  @Get('list')
  async handle() {
    
    const products = await this.listAllProductsUseCase.execute();

    if(!products)
      throw new Error('Products not found');

    return products
  }
}
