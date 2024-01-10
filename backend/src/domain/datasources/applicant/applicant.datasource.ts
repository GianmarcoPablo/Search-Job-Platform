import { AplicantEntity } from "../../entities/applicant/applicant.entity";
import { CreateApplicantDto } from "../../dtos/applicant/create-applicant.dto";

export abstract class ApplicantDatasource {
    abstract createApplicant(applicant: CreateApplicantDto): Promise<AplicantEntity>;
    abstract getApplicant(id: number): Promise<AplicantEntity>;
    abstract getApplicants(): Promise<AplicantEntity[]>;
    abstract getApplicantsByJobId(jobId: number): Promise<AplicantEntity[]>;
    abstract getApplicantsByApplicantId(applicantId: number): Promise<AplicantEntity[]>;
    abstract updateApplicant(applicant: AplicantEntity): Promise<AplicantEntity>;
    abstract deleteApplicant(id: number, applicantId: number): Promise<AplicantEntity>;
    abstract getMyApplications(applicantId: number): Promise<AplicantEntity[]>;
}