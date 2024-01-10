import { VacantEntity } from "../../entities";
import { CreateVacantDto } from "../../dtos";
export abstract class VacantRepository {
    abstract getVacants(): Promise<VacantEntity[]>;
    abstract getVacantById(id: number): Promise<VacantEntity>;
    abstract createVacant(vacant: CreateVacantDto): Promise<VacantEntity>;
    abstract updateVacant(id: number, vacant: CreateVacantDto): Promise<VacantEntity>;
    abstract deleteVacant(id: number, recruiterId: number): Promise<VacantEntity>;
    abstract getVacantsByRecruiterId(recruiterId: number): Promise<VacantEntity[]>;
    abstract getPostulantsOfVacant(vacantId: number): Promise<any>;
}