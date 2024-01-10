import { prisma } from "../../../data/postgresql"
import { UserDataSource } from "../../../domain/datasources";
import { UserEntity } from "../../../domain/entities";
import { UserLoginDto, UserRegisterDto } from "../../../domain/dtos";
import bcrypt from "bcrypt"
import { JwtAdapter } from "../../../config/jwt.adapter";

export class UserDatasourceImpl implements UserDataSource {

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async login(user: UserLoginDto): Promise<UserEntity> {
        const { email, password } = user
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                include: {
                    applicant: true,
                    recruiter: true
                },
            })
            if (!user) throw new Error("User not found")
            const isValidPassword = await this.comparePassword(password, user.password)
            if (!isValidPassword) throw new Error("Invalid password")
            const token = await JwtAdapter.generateToken({ id: user.id })
            return UserEntity.fromObject({ ...user, token })
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

    async register(user: UserRegisterDto): Promise<UserEntity> {
        try {
            const exits = await prisma.user.findUnique({ where: { email: user.email } })
            if (exits) throw new Error("User already exists")
            const rolesValid = ["recruiter", "applicant"].includes(user.role)
            if (!rolesValid) throw new Error(`Invalid role, valid roles are: recruiter, applicant`)
            const hashearPassword = await this.hashPassword(user.password)
            const newUser = await prisma.user.create({
                data: {
                    ...user,
                    password: hashearPassword,
                }
            })

            // asignar al usuario como recruiter o applicant

            if (user.role === "recruiter") {
                await prisma.recruiter.create({
                    data: {
                        userId: newUser.id
                    }
                })
            } else {
                await prisma.applicant.create({
                    data: {
                        userId: newUser.id
                    }
                })
            }

            // generar token
            const token = await JwtAdapter.generateToken({ id: newUser.id })
            return UserEntity.fromObject({ ...newUser, token })
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

    async updateProfileRecruiter(id: any, newData: any) {
        try {

            const user = await prisma.recruiter.findUnique({
                where: {
                    id
                }
            })

            if (!user) throw new Error("User recruiter not found")
            const userUpdated = await prisma.recruiter.update({
                where: {
                    id
                },
                data: {
                    ...newData
                }
            })
            return userUpdated
        } catch (error: any) {
            throw { message: error.message, status: 400 }
        }
    }

    async updateProfileApplicant(id: any, newData: any) {
        try {

            //buscar si existe el usuario
            const user = await prisma.applicant.findUnique({
                where: {
                    id
                }
            })

            if (!user) throw new Error("User applicant not found")

            const userUpdated = await prisma.applicant.update({
                where: {
                    id
                },
                data: {
                    ...newData
                }
            })
            return userUpdated
        } catch (error: any) {
            console.log(error);
            throw { message: error.message, status: 400 }
        }
    }
}