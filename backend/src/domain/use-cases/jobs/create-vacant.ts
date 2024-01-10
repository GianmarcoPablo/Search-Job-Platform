import { CreateVacantDto } from "../../dtos";
import { VacantEntity } from "../../entities/jobs/vacant.entity";
import { VacantRepository } from "../../repositories/jobs/vacant.repository";

export interface CreateVacantUseCase {
    execute(vacant: CreateVacantDto): Promise<VacantEntity>
}


export class CreateVacant implements CreateVacantUseCase {

    constructor(
        private readonly repository: VacantRepository
    ) { }

    execute(vacant: CreateVacantDto): Promise<VacantEntity> {
        return this.repository.createVacant(vacant);
    }

}