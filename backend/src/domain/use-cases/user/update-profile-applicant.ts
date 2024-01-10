import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface UpdateProfileApplicant {
    execute(id: any, newData: any): Promise<UserEntity>;
}

export class updateProfileApplicant implements UpdateProfileApplicant {

    constructor(
        private readonly repository: UserRepository
    ) { }

    execute(id: any, newData: any) {
        return this.repository.updateProfileApplicant(id, newData);
    }
}