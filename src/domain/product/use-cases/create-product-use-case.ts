import { ProductRepository } from "@/infra/database/repositories/implementation/product/product-repository";
import { Injectable } from "@nestjs/common";
import { Either, right } from '@/core/either';
import { ProductEntity } from "../entities/product-entity";

interface ProductUseCaseRequest{
   name: string;
   price: number;
   description: string;
   isAvailable: boolean;
}

type ProductUseCaseResponse = Either<
null,
 {
   product: ProductEntity
 }
>

@Injectable()
export class CreateProductUseCase {
   constructor(private productRepository: ProductRepository) { }

   async execute({name, price, description, isAvailable}: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
      
      const product = ProductEntity.create({ name, price, description, isAvailable })

      await this.productRepository.create(product)

      return right({ product })
   }
}