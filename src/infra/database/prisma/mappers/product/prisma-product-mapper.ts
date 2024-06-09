import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProductEntity } from '@/domain/product/entities/product-entity';
import { Product as ProductPrisma, Prisma } from '@prisma/client'

export class PrismaProductMapper {

   static toDomain(raw: ProductPrisma ): ProductEntity {

      return ProductEntity.create(
         { 
            name: raw.name,
            price: raw.price,
            description: raw.description,
            isAvailable: raw.isAvailable
         }, 
         
         new UniqueEntityID(raw.id) 
      )
   }

   static toPrisma (product: ProductEntity): Prisma.ProductUncheckedCreateInput {
      return {
         name: product.name,
         price: product.price,
         description: product.description,
         isAvailable: product.isAvailable
      }
   }
}