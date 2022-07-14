import {User} from "../entities/UserEntity";

export interface IUserRepository {
    getUserByName(name: string): Promise<User | undefined>;
}