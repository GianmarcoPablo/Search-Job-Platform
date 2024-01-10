import { UserEntity } from "../../entities";
import { UserLoginDto, UserRegisterDto } from "../../dtos";

export abstract class UserRepository {
    abstract login(user: UserLoginDto): Promise<UserEntity>
    abstract register(user: UserRegisterDto): Promise<UserEntity>
    abstract updateProfileRecruiter(user: any, newData: any): any
    abstract updateProfileApplicant(id: number, newData: any): any
}