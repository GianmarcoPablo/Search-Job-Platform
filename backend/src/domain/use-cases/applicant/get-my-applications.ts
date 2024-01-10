import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { AplicantRepository } from "../../repositories/applicant/applicant.repository";

export interface getMyApplications {
    execute(applicantId: number): Promise<AplicantEntity[]>;
}

export class GetMyApplications implements getMyApplications {

    constructor(
        private readonly repository: AplicantRepository
    ) { }

    execute(applicantId: number): Promise<AplicantEntity[]> {
        return this.repository.getMyApplications(applicantId);
    }
}