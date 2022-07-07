import {User} from "../Entities/UserEntity";

export interface IUserRepository {
    getUserByName(name: string): Promise<User>;
}