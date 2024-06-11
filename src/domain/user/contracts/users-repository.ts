import { User } from "../entities/user";

export abstract class IUsersRepository {
   abstract findByEmail(email: string): Promise<User | null>;
   abstract findAll(): Promise<User[] | null >;
   abstract findById(id: string): Promise<User | null>;
   abstract save(user: User): Promise<User | null>;
   abstract delete(id: string): Promise<User | null>;
   abstract update(id: string, user: User): Promise<User | null>;

}