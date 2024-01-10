import { prisma } from "../../../data/postgresql"
import { VacantDataSource } from "../../../domain/datasources";
import { CreateVacantDto } from "../../../domain/dtos";
import { VacantEntity } from "../../../domain/entities";

export class VacantDataSourceImpl implements VacantDataSource {
    async getVacants(): Promise<VacantEntity[]> {
        try {
            const vacants = await prisma.job.findMany()
            return vacants.map(vacant => VacantEntity.fromObject(vacant))
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

    async getVacantById(id: number): Promise<VacantEntity> {
        try {
            const vacant = await prisma.job.findUnique({
                where: { id },
                include: {
                    recruiter: {
                        select: {
                            user: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                }
                            }
                        }
                    },
                    applications: {
                        select: {
                            applicant: {
                                select: {
                                    user: {
                                        select: {
                                            id: true,
                                            firstName: true,
                                            lastName: true,
                                            email: true,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            applications: true,
                        }
                    }
                }
            })
            if (!vacant) throw new Error("Vacant not found" + id)
            return VacantEntity.fromObject({ ...vacant })
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }


    async createVacant(vacant: CreateVacantDto): Promise<VacantEntity> {
        try {
            const newVacant = await prisma.job.create({
                data: {
                    ...vacant,
                }
            })
            return VacantEntity.fromObject(newVacant)
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

    updateVacant(id: number, vacant: CreateVacantDto): Promise<VacantEntity> {
        throw new Error("Method not implemented.");
    }

    async deleteVacant(id: number, recruiterId: number): Promise<VacantEntity> {
        try {
            // que solo el reclutador pueda eliminar sus vacantes
            const vacant = await prisma.job.findUnique({ where: { id } })
            if (vacant?.recruiterId !== recruiterId) throw new Error("You can't delete this vacant api")
            const deletedVacant = await prisma.job.delete({ where: { id } })
            return VacantEntity.fromObject(deletedVacant)
        } catch (error: any) {
            console.log(error);
            throw { message: error.message, status: 400 }
        }
    }
    async getVacantsByRecruiterId(recruiterId: number): Promise<VacantEntity[]> {
        try {
            const vacants = await prisma.job.findMany({
                where: {
                    recruiterId,
                },
            })
            return vacants.map(vacant => VacantEntity.fromObject(vacant))
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

    async getPostulantsOfVacant(vacantId: number): Promise<any> {
        try {
            const vacant = await prisma.job.findUnique({
                where: { id: vacantId },
                include: {
                    applications: {
                        include: {
                            applicant: true,
                        }
                    }
                }
            })
            if (!vacant) throw new Error("Vacant not found" + vacantId)
            return vacant.applications.map(application => {
                return {
                    id: application.id,
                    applicant: application.applicant,
                }
            })
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

}