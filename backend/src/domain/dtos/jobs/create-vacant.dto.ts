type WorkModality = "remote" | "presential" | "hybrid";
type TypeJob = "full-time" | "part-time" | "freelance" | "internship";

export class CreateVacantDto {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly company: string,
        public readonly salary: number,
        public readonly location: string,
        public readonly status: boolean,
        public readonly recruiterId: number,
        public readonly skills: string[],
        public readonly createdAt: Date,
        public readonly requirements: string,
        public readonly benefits: string,
        public readonly workModality: WorkModality,
        public readonly typeJob?: TypeJob,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateVacantDto?] {

        const { title, description, company, salary, location, status, recruiterId, skills, createdAt, requirements, benefits, workModality, typeJob } = props;


        if (!title) return ["title is required"];
        if (!company) return ["company is required"];
        if (!location) return ["location is required"];
        if (!salary) return ["salary is required"];
        if (!description) return ["description is required"];
        if (salary < 0) return ["salary must be greater than 0"];
        if (isNaN(salary)) return ["salary must be a number"];
        if (!requirements) return ["requirements is required"];
        if (!skills) return ["skills is required"];
        if (!benefits) return ["benefits is required"];
        if (!status) return ["status is required"];
        if (!recruiterId) return ["recruiterId is required"];
        if (!createdAt) return ["createdAt is required"];
        if (!workModality) return ["workModality is required"];
        if (!typeJob) return ["typeJob is required"];

        return [undefined, new CreateVacantDto(title, description, company, salary, location, status, recruiterId, skills, createdAt, requirements, benefits, workModality, typeJob)]

    }
}