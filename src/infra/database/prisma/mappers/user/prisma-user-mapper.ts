import { Prisma, User as UserPrisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User as UserDomain } from "@/domain/user/entities/user";

export class PrismaUserMapper{
   static toDomain(raw: UserPrisma): UserDomain {

      return UserDomain.create(
         {
            name: raw.name,
            email: raw.email,
            password: raw.password ,
            isActive: raw.isActive
         },
         new UniqueEntityID(raw.id)
      )
   }

   static toPrisma(user: UserDomain): Prisma.UserUncheckedCreateInput {
      return {
         id: user.id.toString(),
         name: user.name,
         email: user.email,
         password: user.password,
         isActive: user.isActive
      }
   }
}