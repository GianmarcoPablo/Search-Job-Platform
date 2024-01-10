import { VacantEntity } from "../../entities/jobs/vacant.entity";
import { VacantRepository } from "../../repositories/jobs/vacant.repository";

export interface GetallVacantsUseCase {
    execute(): Promise<VacantEntity[]>
}


export class GetAllVacants implements GetallVacantsUseCase {

    constructor(
        private readonly repository: VacantRepository
    ) { }

    execute(): Promise<VacantEntity[]> {
        return this.repository.getVacants();
    }
}