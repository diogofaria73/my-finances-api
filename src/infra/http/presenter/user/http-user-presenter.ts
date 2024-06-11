import { User } from "@/domain/user/entities/user";

export class HttpUserPresenter {
   static toHTTPResponse(user: User) {
      return {
         id: user.id.toString(),
         name: user.name,
         email: user.email,
         isActive: user.isActive
      }
   }
}