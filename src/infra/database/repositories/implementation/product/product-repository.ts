import { ICreateProductInterface } from "@/domain/product/application/interfaces/product-interfaces-repository";
import { Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";

@Injectable()
export class ProductRepository implements ICreateProductInterface<Product> {
   createProduct(data: { id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }): Promise<{ id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }> {
      throw new Error("Method not implemented.");
   }
   updateProduct(data: { id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }): Promise<{ id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }> {
      throw new Error("Method not implemented.");
   }
   deleteProduct(id: string): Promise<{ id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }> {
      throw new Error("Method not implemented.");
   }
   listAllProducts(): Promise<{ id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }[]> {
      throw new Error("Method not implemented.");
   }
   listProductById(id: string): Promise<{ id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }> {
      throw new Error("Method not implemented.");
   }
   listProductByType(type: string): Promise<{ id: string; name: string; description: string; price: number; createdAt: Date; updatedAt: Date; }[]> {
      throw new Error("Method not implemented.");
   }
}