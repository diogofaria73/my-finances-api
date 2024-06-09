import { Either, right } from "@/core/either";
import { ProductEntity } from "../entities/product-entity";
import { ProductRepository } from "@/infra/database/repositories/implementation/product/product-repository";
import { Injectable } from "@nestjs/common";

type ListAllProductsUseCaseResponse = Either<
null,
{
   products: ProductEntity[]
}
>

@Injectable()
export class ListAllProductsUseCase{
   constructor(private productRepository: ProductRepository) { }

   async execute(): Promise<ListAllProductsUseCaseResponse | null> {
      const products = await this.productRepository.findAll()

      if(products)
         return right({ products })

      return null
   }

}