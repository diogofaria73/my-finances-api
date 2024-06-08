import { AggregateRoot } from '@/core/entities/aggregate-root';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';

export interface QuestionProps {}
export class Product {
  get domainEvents(): DomainEvent[] {
    throw new Error('Method not implemented.');
  }
  protected addDomainEvent(domainEvent: DomainEvent): void {
    throw new Error('Method not implemented.');
  }
  public clearEvents(): void {
    throw new Error('Method not implemented.');
  }
  // protected props: QuestionProps;
  // get id(): UniqueEntityID {
  //    throw new Error("Method not implemented.");
  // }
  public equals(entity: Entity<any>): boolean {
    throw new Error('Method not implemented.');
  }
}
