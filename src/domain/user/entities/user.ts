import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface UserProps {
   id?: UniqueEntityID
   name: string;
   email: string;
   password: string;
   isActive: boolean;
}

export class User extends Entity<UserProps>{

   get name() {
      return this.props.name
   }

   set name(value: string) {
      this.props.name = value;
   }

   get email() {
      return this.props.email;
   }

   set email(value: string) {
      this.props.email = value;
   }

   get password() {
      return this.props.password;
   }

   set password(value: string) {
      this.props.password = value;
   }

   get isActive(){
      return this.props.isActive;
   }

   set isActive(value: boolean) {
      this.props.isActive = value
   }

   get createdAt() {
      return this.createdAt
   }

   static create(props: UserProps, id?: UniqueEntityID) {
      const user = new User(props, id)

      return user;
   }

   static update(props: UserProps) {
      const user = new User(props)

      return user;
   }


}