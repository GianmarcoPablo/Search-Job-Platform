import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface UpdateProfileRecruiter {
    execute(user: any, newData: any): Promise<UserEntity>;
}

export class updateProfileRecruiter implements UpdateProfileRecruiter {

    constructor(
        private readonly repository: UserRepository
    ) { }

    execute(user: any, newData: any) {
        return this.repository.updateProfileRecruiter(user, newData);
    }
}