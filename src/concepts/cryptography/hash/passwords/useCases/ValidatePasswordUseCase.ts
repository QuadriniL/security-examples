import bcrypt from 'bcrypt';
import {User} from "../../../../../entities/UserEntity";
import {IUserRepository} from "../../../../../repositories/IUserRepository";

export class ValidatePasswordUseCase {
    private hashService;
    private userRepository;
    constructor(dependencies: { hashService: bcrypt, userRepository: IUserRepository }) {
        this.hashService = dependencies.hashService;
        this.userRepository = dependencies.userRepository;
    }

    async execute(data: { user: string, password: string }): Promise<User | null> {
        const user = await this.userRepository.getUserByName(data.user);

        if (!user) return null;

        if(await this.hashService.compare(data.password, user.values.passwordHash))
            return user;

        return null;
    }
}