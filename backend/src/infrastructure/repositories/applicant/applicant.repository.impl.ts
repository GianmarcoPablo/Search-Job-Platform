import { ApplicantDatasource } from "../../../domain/datasources/applicant/applicant.datasource";
import { CreateApplicantDto } from "../../../domain/dtos/applicant/create-applicant.dto";
import { AplicantEntity } from "../../../domain/entities/applicant/applicant.entity";
import { AplicantRepository } from "../../../domain/repositories/applicant/applicant.repository";

export class ApplicantRepositoryImpl implements AplicantRepository {

    constructor(
        private readonly datasource: ApplicantDatasource
    ) { }

    createApplicant(applicant: CreateApplicantDto): Promise<AplicantEntity> {
        return this.datasource.createApplicant(applicant);
    }
    getApplicant(id: number): Promise<AplicantEntity> {
        return this.datasource.getApplicant(id);
    }
    getApplicants(): Promise<AplicantEntity[]> {
        return this.datasource.getApplicants();
    }
    getApplicantsByJobId(jobId: number): Promise<AplicantEntity[]> {
        return this.datasource.getApplicantsByJobId(jobId);
    }
    getApplicantsByApplicantId(applicantId: number): Promise<AplicantEntity[]> {
        throw new Error("Method not implemented.");
    }
    updateApplicant(applicant: AplicantEntity): Promise<AplicantEntity> {
        throw new Error("Method not implemented.");
    }
    deleteApplicant(id: number, applicantId: number): Promise<AplicantEntity> {
        return this.datasource.deleteApplicant(id, applicantId);
    }
    getMyApplications(applicantId: number): Promise<AplicantEntity[]> {
        return this.datasource.getMyApplications(applicantId);
    }
}