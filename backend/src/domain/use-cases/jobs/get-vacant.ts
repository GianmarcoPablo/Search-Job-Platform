import { VacantEntity } from "../../entities/jobs/vacant.entity";
import { VacantRepository } from "../../repositories/jobs/vacant.repository";

export interface GetVacantByIdUseCase {
    execute(id: number): Promise<VacantEntity>
}


export class GetVacant implements GetVacantByIdUseCase {

    constructor(
        private readonly repository: VacantRepository
    ) { }

    execute(id: number): Promise<VacantEntity> {
        return this.repository.getVacantById(id);
    }

}