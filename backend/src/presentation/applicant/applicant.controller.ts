import { Request, Response } from "express";
import { AplicantRepository } from "../../domain/repositories/applicant/applicant.repository";
import { CreateApplicantDto } from "../../domain/dtos/applicant/create-applicant.dto";
import { CreateApplicant } from "../../domain/use-cases/applicant/create-applicant";
import { GetMyApplications } from "../../domain/use-cases/applicant/get-my-applications";
import { DeleteApplicant } from "../../domain/use-cases/applicant/delete-applicant";
import { GetMyApplicantsByJobId } from "../../domain/use-cases/applicant/get-applicants-by-JobId";
import { GetApplicantById } from "../../domain/use-cases/applicant/get-applicant-byId"
import { GetAllApplicants } from "../../domain/use-cases/applicant/get-all-applicants";

export class ApplicantController {
    constructor(
        private readonly repository: AplicantRepository
    ) { }

    public getApplicants = async (req: Request, res: Response) => {
        try {
            const applicants = await new GetAllApplicants(this.repository).execute();
            res.status(200).json(applicants);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public getApplicantById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Id is required" });
        if (isNaN(parseInt(id))) return res.status(400).json({ error: "Id must be a number" });
        try {
            const applicant = await new GetApplicantById(this.repository).execute(parseInt(id));
            res.status(200).json({ applicant });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public createApplicant = async (req: Request, res: Response) => {
        const { applicant } = req.body;
        const [error, applicantDto] = CreateApplicantDto.create({ ...req.body, applicantId: applicant.id });
        if (error) return res.status(400).json({ error });
        try {
            const applicant = await new CreateApplicant(this.repository).execute(applicantDto!);
            res.status(200).json(applicant);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ error: message });
        }
    }

    public updateApplicant = async (req: Request, res: Response) => {

    }

    public deleteApplicant = async (req: Request, res: Response) => {
        const { id } = req.params
        const { applicant } = req.body;
        try {
            const deleted = await new DeleteApplicant(this.repository).execute(parseInt(id), applicant.id);
            res.status(200).json({ deleted });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public getApplicantsByJobId = async (req: Request, res: Response) => {
        const { jobId } = req.params;
        try {
            const applicants = await new GetMyApplicantsByJobId(this.repository).execute(parseInt(jobId));
            res.status(200).json({ applicants });
            console.log(applicants);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }

    public getApplicantsByApplicantId = async (req: Request, res: Response) => {

    }

    public getMyApplications = async (req: Request, res: Response) => {
        const { applicant } = req.body;

        if (!applicant) return res.status(400).json({
            error: "Upps! Something went wrong, please try again later"
        });

        try {
            const applications = await new GetMyApplications(this.repository).execute(applicant.id);
            res.status(200).json({ applications });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}