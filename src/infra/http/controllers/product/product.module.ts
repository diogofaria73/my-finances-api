import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { ListProductsController } from './list-products.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController, ListProductsController],
  providers: [],
})
export class ProductModule {}
