import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateProductController } from './actions/create-product.controller';
import { ListProductsController } from './actions/list-products.controller';
import { CreateProductUseCase } from '@/domain/product/use-cases/create-product-use-case';
import { ListAllProductsUseCase } from '@/domain/product/use-cases/find-all-products-use-case';
import { UpdateProductUseCase } from '@/domain/product/use-cases/update-product-use-case';
import { UpdateProductController } from './actions/update-product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController, ListProductsController, UpdateProductController],
  providers: [CreateProductUseCase, ListAllProductsUseCase, UpdateProductUseCase],
})
export class ProductModule {}
