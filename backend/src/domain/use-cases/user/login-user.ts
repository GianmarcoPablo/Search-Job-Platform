import { UserLoginDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";
export interface LoginUserUseCase {
    execute(user: UserLoginDto): Promise<UserEntity>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ) { }

    execute(user: UserLoginDto): Promise<UserEntity> {
        return this.repository.login(user);
    }
}