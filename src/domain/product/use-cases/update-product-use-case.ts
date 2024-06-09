import { Either } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "../entities/product-entity";
import { ProductRepository } from "@/infra/database/repositories/implementation/product/product-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface UpdateProductUseCaseRequest {
   id: string;
   name: string;
   price: number;
   description: string;
   isAvailable: boolean;
}

type UpdateProductUseCaseResponse = Either< ResourceNotFoundError | NotAllowedError, {
   product: ProductEntity
}>


@Injectable()
export class UpdateProductUseCase { 
   constructor( private readonly productRepository: ProductRepository) {}

   async execute(product: UpdateProductUseCaseRequest): Promise<null> {
      return null;
   }
}