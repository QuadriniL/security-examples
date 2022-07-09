import bcrypt from 'bcrypt';
import {ValidatePasswordUseCase} from "./ValidatePasswordUseCase";
import {UserRepositoryInMemory} from "../repositories/inMemory/UserRepositoryInMemory";
import {User} from "../Entities/UserEntity";

describe('Validate Password Use Case', () => {
    let sut: ValidatePasswordUseCase;
    let users;

    it('to be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should return null if user is not found', async () => {
        const result = await sut.execute({user: 'unexisted user', password: 'password'});
        expect(result).toBeNull();
    });

    it('should return null if password is not correct', async () => {
        const result = await sut.execute({user: 'user1', password: 'wrong password'});
        expect(result).toBeNull();
    });

    it('should return user if password is correct', async () => {
        const result = await sut.execute({user: 'user1', password: 'password'});
        expect(result).toBeDefined();
    });

    beforeAll(async () => {
        users = await makeUsers(['user1', 'user2']);
        sut = new ValidatePasswordUseCase(
            {
                hashService: bcrypt,
                userRepository: new UserRepositoryInMemory(users)
            }
        );
    });
});

async function makeUsers(names: string[]): Promise<User[]> {
    return Promise.all(names.map(name => User.create({name, password: 'password'})));
}
