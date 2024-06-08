import { Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { ProductRepository } from './repositories/implementation/product/product-repository';

@Module({
  imports: [],
  providers: [PrismaService, ProductRepository],
  exports: [PrismaService, ProductRepository],
})
export class DatabaseModule {}
