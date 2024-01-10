import { Router } from "express";
import { VacantDataSourceImpl, VacantRepositoryImpl } from "../../infrastructure";
import { VacantController } from "./vacant.controller";
import { AuthMiddlware, IsRecruiterMiddleware } from "../middlewares";

export class VacantRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new VacantDataSourceImpl();
        const repository = new VacantRepositoryImpl(datasource);
        const controller = new VacantController(repository);

        //public routes
        router.get("/", controller.getVacants);
        router.get("/:id", controller.getVacantById);
        //private routes
        router.post("/", [
            AuthMiddlware.validateJWT, //validate token
            IsRecruiterMiddleware.isRecruiter //validate if user is recruiter
        ], controller.createVacant);
        router.put("/:id", AuthMiddlware.validateJWT, controller.updateVacant);
        router.delete("/:id", [
            AuthMiddlware.validateJWT,
            IsRecruiterMiddleware.isRecruiter
        ], controller.deleteVacant);
        router.get("/by/recruiter", [
            AuthMiddlware.validateJWT,
            IsRecruiterMiddleware.isRecruiter
        ], controller.getVacantsByRecruiterId);

        return router;
    }
}