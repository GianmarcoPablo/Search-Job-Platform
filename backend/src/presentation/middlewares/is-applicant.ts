import { Request, Response, NextFunction } from "express"
import { prisma } from "../../data/postgresql"


export class IsApplicantMiddleware {

    static async isApplicant(req: Request, res: Response, next: NextFunction) {
        const { user } = req.body

        if (user.role !== "applicant") {
            return res.status(401).json({ message: "You do not have permission to perform this action" })
        } else {
            const applicant = await prisma.applicant.findUnique({
                where: {
                    userId: user.id
                }
            })
            if (!applicant) return res.status(401).json({ message: "You do not have permission to perform this action" })
            req.body.applicant = applicant
            next()
        }

    }
}