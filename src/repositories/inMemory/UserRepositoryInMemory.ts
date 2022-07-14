import {User} from "../../entities/UserEntity";
import {IUserRepository} from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
    private _users: User[] = [];
    constructor(users?: User[]) {
        this._users = users;
    }

    async getUserByName(name: string): Promise<User | undefined> {
        return this._users.find(user => user.values.name === name);
    }
}