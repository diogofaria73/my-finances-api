import { User as UserPrisma } from "@prisma/client";
import { UserEntity } from "@/domain/user/entities/user-entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class PrismaUserMapper{
   static toDomain(raw: UserPrisma): UserEntity {

      return UserEntity.create(
         {
            name: raw.name,
            email: raw.email,
            password: raw.password ,
            isActive: raw.isActive
         },
         new UniqueEntityID(raw.id)
      )
   }

   static toPrisma(user: any): any {}
}