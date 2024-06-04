import { Module } from '@nestjs/common';
import { CreateProductController } from './controllers/create-product.controller';
import { PrismaService } from 'src/infrastructure/database/service/prisma.service';
import { ListProductsController } from './controllers/list-products.controller';

@Module({
  imports: [],
  controllers: [CreateProductController, ListProductsController],
  providers: [PrismaService],
})
export class ProductModule {}
