import { Request, Response } from "express";
import { VacantRepository } from "../../domain/repositories";
import { CreateVacantDto } from "../../domain/dtos";
import { CreateVacant } from "../../domain/use-cases/jobs/create-vacant";

export class VacantController {

    constructor(
        private readonly repository: VacantRepository
    ) { }

    public getVacants = async (req: Request, res: Response) => {
        try {
            const vacants = await this.repository.getVacants();
            res.status(200).json(vacants);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }

    public getVacantById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const vacant = await this.repository.getVacantById(parseInt(id));
            res.status(200).json(vacant);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }

    public createVacant = async (req: Request, res: Response) => {
        const { recruiter } = req.body
        const [error, vacantDto] = CreateVacantDto.create({ ...req.body, recruiterId: recruiter.id });
        if (error) return res.status(400).json({ error });
        try {
            const vacant = await new CreateVacant(this.repository).execute(vacantDto!);
            res.status(200).json({ vacant });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public updateVacant = async (req: Request, res: Response) => {

    }

    public deleteVacant = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { recruiter } = req.body;
        try {
            const vacant = await this.repository.deleteVacant(parseInt(id), recruiter.id);
            res.status(200).json({ vacant });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public getVacantsByRecruiterId = async (req: Request, res: Response) => {
        const { recruiter } = req.body;
        //const { id } = req.params;
        try {
            const vacants = await this.repository.getVacantsByRecruiterId(recruiter.id);
            res.status(200).json(vacants);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }

    public getPostulantsOfVacant = async (req: Request, res: Response) => {
        const { recruiter } = req.body;
        try {
            const postulants = await this.repository.getPostulantsOfVacant(recruiter.id);
            res.status(200).json(postulants);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }
}