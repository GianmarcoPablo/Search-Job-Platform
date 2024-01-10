import { Router } from "express";
import { ApplicantRepositoryImpl } from "../../infrastructure/repositories/applicant/applicant.repository.impl";
import { ApplicantDatasourceImpl } from "../../infrastructure/datasources/applicant/applicant.datasource.impl";
import { ApplicantController } from "./applicant.controller";
import { AuthMiddlware } from "../middlewares";
import { IsApplicantMiddleware } from "../middlewares/is-applicant"


export class ApplicantRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ApplicantDatasourceImpl();
        const repository = new ApplicantRepositoryImpl(datasource);
        const controller = new ApplicantController(repository);

        router.get("/", controller.getApplicants);
        router.get("/:id", controller.getApplicantById);

        router.post("/", [
            AuthMiddlware.validateJWT,
            IsApplicantMiddleware.isApplicant
        ], controller.createApplicant);

        router.put("/", controller.updateApplicant);
        router.delete("/:id", [
            AuthMiddlware.validateJWT,
            IsApplicantMiddleware.isApplicant
        ], controller.deleteApplicant);
        router.get("/job/:jobId", controller.getApplicantsByJobId);
        router.get("/applicant/:applicantId", controller.getApplicantsByApplicantId);

        //obtener postulaciones que solo le pertenecen al usuario autenticado
        router.get("/my/applications", [
            AuthMiddlware.validateJWT,
            IsApplicantMiddleware.isApplicant
        ], controller.getMyApplications);

        return router;
    }
}