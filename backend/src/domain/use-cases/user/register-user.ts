import { UserRegisterDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface RegisterUserUseCase {
    execute(user: UserRegisterDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ) { }

    execute(user: UserRegisterDto): Promise<UserEntity> {
        return this.repository.register(user);
    }
}