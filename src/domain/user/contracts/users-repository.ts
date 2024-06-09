import { User } from "../entities/user";

export abstract class IUsersRepository {
   abstract save(user: User): Promise<User | null>;
   abstract findByEmail(email: string): Promise<User | null>;

}