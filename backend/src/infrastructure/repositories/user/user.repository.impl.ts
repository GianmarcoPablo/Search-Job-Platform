import { UserDataSource } from "../../../domain/datasources";
import { UserRepository } from "../../../domain/repositories";
import { UserEntity } from "../../../domain/entities";
import { UserLoginDto, UserRegisterDto } from "../../../domain/dtos";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly datasource: UserDataSource
    ) { }

    login(user: UserLoginDto): Promise<UserEntity> {
        return this.datasource.login(user);
    }

    register(user: UserRegisterDto): Promise<UserEntity> {
        return this.datasource.register(user);
    }

    updateProfileRecruiter(user: any, newDate: any): any {
        return this.datasource.updateProfileRecruiter(user, newDate);
    }

    updateProfileApplicant(id: number, newData: any): any {
        return this.datasource.updateProfileApplicant(id, newData);
    }
}