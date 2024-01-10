import { VacantDataSource } from "../../../domain/datasources";
import { CreateVacantDto } from "../../../domain/dtos";
import { VacantEntity } from "../../../domain/entities";
import { VacantRepository } from "../../../domain/repositories";

export class VacantRepositoryImpl implements VacantRepository {

    constructor(
        private readonly datasource: VacantDataSource
    ) { }

    getVacants(): Promise<VacantEntity[]> {
        return this.datasource.getVacants();
    }
    getVacantById(id: number): Promise<VacantEntity> {
        return this.datasource.getVacantById(id);
    }
    createVacant(vacant: CreateVacantDto): Promise<VacantEntity> {
        return this.datasource.createVacant(vacant);
    }
    updateVacant(id: number, vacant: CreateVacantDto): Promise<VacantEntity> {
        throw new Error("Method not implemented.");
    }
    deleteVacant(id: number, recruiterId: number): Promise<VacantEntity> {
        return this.datasource.deleteVacant(id, recruiterId);
    }
    getVacantsByRecruiterId(recruiterId: number): Promise<VacantEntity[]> {
        return this.datasource.getVacantsByRecruiterId(recruiterId);
    }

    getPostulantsOfVacant(vacantId: number): Promise<any> {
        return this.datasource.getPostulantsOfVacant(vacantId);
    }
}