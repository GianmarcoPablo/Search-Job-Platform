import { Router } from "express";
import { UserRoutes } from "./user/user.routes";
import { VacantRoutes } from "./jobs/vacant.routes";
import { ApplicantRoutes } from "./applicant/applicant.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/v1/users", UserRoutes.routes);
        router.use("/api/v1/vacancies", VacantRoutes.routes);
        router.use("/api/v1/applicants", ApplicantRoutes.routes);

        return router;
    }
}