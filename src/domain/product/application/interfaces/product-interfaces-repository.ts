import { ProductEntity } from "../../entities/product-entity";

export abstract class ICreateProductInterface {

  abstract create(data: ProductEntity): Promise<ProductEntity | null>;

  abstract update(data: ProductEntity): Promise<ProductEntity | null>;

  abstract delete(id: string): Promise<ProductEntity | null>;

  abstract  findAll(): Promise<ProductEntity[] | null>;
  
  abstract findById(id: string): Promise<ProductEntity | null>;
}
