import { NextFunction, Response, Request } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/postgresql";

export class AuthMiddlware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization")
        if (!authorization) return res.status(401).json({ message: "No token provided" })
        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ message: "Invalid token" })

        const token = authorization.split(" ")[1]

        try {
            const decoded: any = await JwtAdapter.validateToken(token)
            if (!decoded) return res.status(401).json({ message: "Invalid token" })
            const { id } = decoded
            if (!id) return res.status(401).json({ message: "Invalid token" })
            // obtener todo menos el password
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }, select: {
                    id: true,
                    email: true,
                    role: true,
                    lastName: true,
                    firstName: true,
                }
            })
            if (!user) return res.status(401).json({ message: "Invalid token" })
            req.body.user = user
            next()
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server error" })
        }
    }
}