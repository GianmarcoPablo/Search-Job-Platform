import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { AplicantRepository } from "../../repositories/applicant/applicant.repository";

export interface deleteApplicant {
    execute(id: number, applicantId: number): Promise<AplicantEntity>
}

export class DeleteApplicant implements deleteApplicant {

    constructor(
        private readonly repository: AplicantRepository
    ) { }

    async execute(id: number, applicantId: number): Promise<AplicantEntity> {
        return await this.repository.deleteApplicant(id, applicantId);
    }

}