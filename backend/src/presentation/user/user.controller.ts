import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories";
import { UserRegisterDto, UserLoginDto } from "../../domain/dtos";
import { LoginUser, RegisterUser } from "../../domain/use-cases";
import { updateProfileRecruiter } from "../../domain/use-cases/user/update-profile-recruiter";
import { updateProfileApplicant } from "../../domain/use-cases/user/update-profile-applicant";

export class UserController {
    constructor(
        private readonly repository: UserRepository
    ) { }

    public login = async (req: Request, res: Response) => {
        const [error, loginUserDto] = UserLoginDto.create(req.body);
        if (error) return res.status(400).json({ error });
        try {
            const user = await new LoginUser(this.repository).execute(loginUserDto!);
            res.status(200).json(user);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }

    public register = async (req: Request, res: Response) => {
        const [error, registerUserDto] = UserRegisterDto.create(req.body);
        if (error) return res.status(400).json({ error });
        try {
            const user = await new RegisterUser(this.repository).execute(registerUserDto!);
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json(error);
        }
    }


    public profile = (req: Request, res: Response) => {
        const { user } = req.body;

        if (!user) return res.status(400).json({ error: "User not found" });

        res.status(200).json(user);
    }

    public updateProfileRecruiter = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { companyName, companyDescription, website, profilePicture, location, about } = req.body;
        const newData = { companyName, companyDescription, website, profilePicture, location, about };
        try {
            const user = await new updateProfileRecruiter(this.repository).execute(Number(id), newData);
            res.status(200).json(user);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }

    public updateProfileApplicant = (req: Request, res: Response) => {
        const { id } = req.params;
        const { education, experience, languages, location, about, profilePicture, linkedin, github, website } = req.body;

        const newData = { education, experience, languages, location, about, profilePicture, linkedin, github, website };
        try {
            const user = new updateProfileApplicant(this.repository).execute(Number(id), newData);
            res.status(200).json(user);
        } catch (error: any) {
            const { message, status } = error;
            res.status(status).json({ msg: message });
        }
    }
}