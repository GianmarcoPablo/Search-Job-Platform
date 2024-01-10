import { CreateApplicantDto } from "../../dtos/applicant/create-applicant.dto";
import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { AplicantRepository } from "../../repositories/applicant/applicant.repository";

export interface createApplicant {
    execute(applicant: CreateApplicantDto): Promise<AplicantEntity>;
}

export class CreateApplicant implements createApplicant {

    constructor(
        private readonly repository: AplicantRepository
    ) { }

    execute(applicant: CreateApplicantDto): Promise<AplicantEntity> {
        return this.repository.createApplicant(applicant);
    }
}