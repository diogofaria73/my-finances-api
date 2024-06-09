import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@prisma/client/runtime/library";
import { ProductCreateEdEvent } from "../events/product-created-event";

export interface ProductProps {
   productId?: UniqueEntityID;
   name: string;
   price: number;
   description: string;
   isAvailable: boolean;
}

export class ProductEntity extends AggregateRoot<ProductProps> {

   get  productId() {
      return this.props.productId
   }

   get name() {
      return this.props.name;
   }

   set name(value: string) {
      this.props.name = value;
   }

   get price() {
      return this.props.price;
   }

   set price(value: number) {
      this.props.price = value;
   }

   get description() {
      return this.props.description;
   }

   set description(value: string) {
      this.props.description = value;
   
   }

   get isAvailable(){
      return this.props.isAvailable;
   }

   set isAvailable(value: boolean) {
      this.props.isAvailable = value
   }

   static create(props: ProductProps, id?: UniqueEntityID) { 

      const product = new ProductEntity(
         { ...props }, 
         id
      )
      
      const isNewProduct = !id

      if(isNewProduct) {
         product.addDomainEvent(new ProductCreateEdEvent(product))
      }
   }
}