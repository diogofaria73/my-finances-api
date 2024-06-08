export interface ICreateProductInterface<T> {
   createProduct(data: T): Promise<T>;
   updateProduct(data: T): Promise<T>;
   deleteProduct(id: string): Promise<T>;
   listAllProducts(): Promise<T[]>;
   listProductById(id: string): Promise<T>;
   listProductByType(type: string): Promise<T[]>;

}