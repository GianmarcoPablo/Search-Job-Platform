import { Request, Response, NextFunction } from "express"
import { prisma } from "../../data/postgresql"
export class IsRecruiterMiddleware {

    static async isRecruiter(req: Request, res: Response, next: NextFunction) {
        const { user } = req.body
        if (user.role !== "recruiter") {
            return res.status(401).json({ message: "You do not have permission to perform this action" })
        } else {
            const recruiter = await prisma.recruiter.findUnique({
                where: {
                    userId: user.id
                }
            })
            if (!recruiter) return res.status(401).json({ message: "You do not have permission to perform this action" })
            req.body.recruiter = recruiter
            next()
        }

    }
}