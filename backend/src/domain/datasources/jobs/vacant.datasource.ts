import { CreateVacantDto } from "../../dtos";
import { VacantEntity } from "../../entities";
//Todo add vacant entity
export abstract class VacantDataSource {
    abstract getVacants(): Promise<VacantEntity[]>;
    abstract getVacantById(id: number): Promise<VacantEntity>;
    abstract createVacant(vacant: CreateVacantDto): Promise<VacantEntity>;
    abstract updateVacant(id: number, vacant: CreateVacantDto): Promise<VacantEntity>;
    abstract deleteVacant(id: number, recruiterId: number): Promise<VacantEntity>;
    abstract getVacantsByRecruiterId(recruiterId: number): Promise<VacantEntity[]>;
    abstract getPostulantsOfVacant(vacantId: number): Promise<any>;
}
