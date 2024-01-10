import { VacantEntity } from "../../entities/jobs/vacant.entity";
import { VacantRepository } from "../../repositories/jobs/vacant.repository";

export interface DeleteVacantUseCase {
    execute(id: number, recluiterId: number): Promise<VacantEntity>
}

export class DeleteVacant implements DeleteVacantUseCase {

    constructor(
        private readonly repository: VacantRepository
    ) { }

    execute(id: number, recluiterId: number): Promise<VacantEntity> {
        return this.repository.deleteVacant(id, recluiterId);
    }
}