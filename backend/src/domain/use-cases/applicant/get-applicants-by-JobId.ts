import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { AplicantRepository } from "../../repositories/applicant/applicant.repository";

export interface getMyApplicantsByJobId {
    execute(jobId: number): Promise<AplicantEntity[]>;
}

export class GetMyApplicantsByJobId implements getMyApplicantsByJobId {

    constructor(
        private readonly repository: AplicantRepository
    ) { }

    execute(jobId: number): Promise<AplicantEntity[]> {
        return this.repository.getApplicantsByJobId(jobId);
    }
}