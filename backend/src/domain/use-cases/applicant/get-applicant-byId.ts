import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { AplicantRepository } from "../../repositories/applicant/applicant.repository";

export interface getApplicantById {
    execute(id: number): Promise<AplicantEntity>;
}

export class GetApplicantById implements getApplicantById {

    constructor(
        private readonly repository: AplicantRepository
    ) { }

    execute(id: number): Promise<AplicantEntity> {
        return this.repository.getApplicant(id);
    }
}