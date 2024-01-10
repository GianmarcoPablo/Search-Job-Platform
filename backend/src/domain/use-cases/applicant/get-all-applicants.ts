import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { AplicantRepository } from "../../repositories/applicant/applicant.repository";

export interface getAllApplicants {
    execute(): Promise<AplicantEntity[]>;
}

export class GetAllApplicants implements getAllApplicants {

    constructor(
        private readonly repository: AplicantRepository
    ) { }

    execute(): Promise<AplicantEntity[]> {
        return this.repository.getApplicants();
    }
}