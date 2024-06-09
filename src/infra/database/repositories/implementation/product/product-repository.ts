import { ICreateProductInterface } from '@/domain/product/application/interfaces/product-interfaces-repository';
import { ProductEntity } from '@/domain/product/entities/product-entity';
import { PrismaService } from '@/infra/database/prisma.service';
import { PrismaProductMapper } from '@/infra/database/prisma/mappers/product/prisma-product-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository implements ICreateProductInterface {

  constructor( private readonly prisma: PrismaService) { }

  async create(data: ProductEntity): Promise<ProductEntity | null> {
    
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        isAvailable: data.isAvailable
      }
    })

    if (!product) return null

    return PrismaProductMapper.toDomain(product)
  }
  async update(data: ProductEntity): Promise<ProductEntity | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<ProductEntity | null> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<ProductEntity[] | null> {
    const products = await this.prisma.product.findMany()

    return products.map(PrismaProductMapper.toDomain)
  }
  async findById(id: string): Promise<ProductEntity | null> {
    throw new Error('Method not implemented.');
  }

}
