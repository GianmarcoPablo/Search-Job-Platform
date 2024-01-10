import { Router } from "express";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { UserController } from "./user.controller";
import { AuthMiddlware } from "../middlewares/auth.middleware";
import { IsApplicantMiddleware } from "../middlewares/is-applicant";
import { IsRecruiterMiddleware } from "../middlewares";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UserDatasourceImpl();
        const repository = new UserRepositoryImpl(datasource);
        const controller = new UserController(repository);

        router.post("/login", controller.login)
        router.post("/register", controller.register)
        router.get("/profile", AuthMiddlware.validateJWT, controller.profile)
        router.put("/update/profile/recruiter/:id", AuthMiddlware.validateJWT, IsRecruiterMiddleware.isRecruiter, controller.updateProfileRecruiter)
        router.put("/update/profile/applicant/:id", AuthMiddlware.validateJWT, IsApplicantMiddleware.isApplicant, controller.updateProfileApplicant)
        return router;
    }
}