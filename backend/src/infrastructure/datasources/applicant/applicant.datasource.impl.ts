import { prisma } from "../../../data/postgresql";
import { ApplicantDatasource } from "../../../domain/datasources/applicant/applicant.datasource";
import { CreateApplicantDto } from "../../../domain/dtos/applicant/create-applicant.dto";
import { AplicantEntity } from "../../../domain/entities/applicant/applicant.entity";



export class ApplicantDatasourceImpl implements ApplicantDatasource {
    async createApplicant(applicant: CreateApplicantDto): Promise<AplicantEntity> {

        try {
            //validar que el usuario no haya aplicado a la misma vacante
            const applicantExists = await prisma.application.findFirst({
                where: {
                    applicantId: applicant.applicantId,
                    jobId: applicant.jobId
                }
            })

            if (applicantExists) throw new Error("true")

            const newApplicant = await prisma.application.create(
                {
                    data: applicant,
                    include: {
                        applicant: true,
                        job: true
                    },
                }
            )
            return AplicantEntity.fromObject(newApplicant)
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }
    async getApplicant(id: number): Promise<AplicantEntity> {
        try {
            const applicant = await prisma.application.findUnique({
                where: {
                    id
                },
                /**
                 * 
                 * include: {
                    applicant: true,
                    job: true
                },
                 */
            })
            return AplicantEntity.fromObject({ ...applicant })
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }
    async getApplicants(): Promise<AplicantEntity[]> {
        try {
            const applicants = await prisma.application.findMany({
                include: {
                    applicant: {
                        include: {
                            user: true
                        }
                    },
                }
            })
            console.log(applicants);
            return applicants.map(applicant => AplicantEntity.fromObject(applicant))
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }
    async getApplicantsByJobId(jobId: number): Promise<AplicantEntity[]> {
        try {
            const applicants = await prisma.application.findMany({
                where: {
                    jobId
                },
                include: {
                    applicant: true,
                    job: true
                },
            })
            return applicants.map(applicant => AplicantEntity.fromObject(applicant))
        } catch (error: any) {
            console.log(error);
            throw { message: error.message, status: 400 }
        }
    }
    getApplicantsByApplicantId(applicantId: number): Promise<AplicantEntity[]> {
        throw new Error("Method not implemented.");
    }
    updateApplicant(applicant: AplicantEntity): Promise<AplicantEntity> {
        throw new Error("Method not implemented.");
    }
    async deleteApplicant(id: number, applicantId: number): Promise<AplicantEntity> {
        try {
            const applicant = await prisma.application.findUnique({ where: { id } })
            if (applicant?.applicantId !== applicantId) throw new Error("You cannot delete this application")
            const deletedApplicant = await prisma.application.delete({ where: { id } })
            return AplicantEntity.fromObject(deletedApplicant)
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }
    async getMyApplications(applicantId: number): Promise<AplicantEntity[]> {
        try {
            const applications = await prisma.application.findMany({
                where: {
                    applicantId
                },
                include: {
                    applicant: true,
                    job: true
                },
            })
            return applications.map(application => AplicantEntity.fromObject(application))
        } catch (error: any) {
            console.log(error);
            throw { message: error.message, status: 400 }
        }
    }
}