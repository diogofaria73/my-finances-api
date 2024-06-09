import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { ProductEntity } from "../entities/product-entity";

export class ProductCreateEdEvent implements DomainEvent {
   public ocurredAt: Date;
   public product: ProductEntity

   constructor(product: ProductEntity ) {
      this.product = product
      this.ocurredAt = new Date()
   }

   getAggregateId(): UniqueEntityID {
     return this.product.id
   }
   
}