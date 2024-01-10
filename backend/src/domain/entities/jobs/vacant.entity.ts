interface recruiter {
    user: {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
    }
}

export class VacantEntity {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly salary: number,
        public readonly company: string,
        public readonly status: string,
        public readonly location: string,
        public readonly recruiterId: string,
        public readonly skills: string[],
        public readonly createdAt: Date,
        public readonly recruiter: recruiter,
        public readonly requirements: string,
        public readonly benefits: string,
        public readonly workModality: string,
        public readonly applications?: any[],
        public readonly _count?: any,
        public readonly count?: any[],
    ) { }

    public static fromObject(obj: { [key: string]: any }): VacantEntity {

        const { id, title, description, salary, company, status, location, recruiterId, skills, createdAt, recruiter, applications, _count, count, requirements, benefits, workModality } = obj;

        if (!id) throw new Error("id is required");
        if (!title) throw new Error("title is required");
        if (!description) throw new Error("description is required");
        if (!salary) throw new Error("salary is required");
        if (!company) throw new Error("company is required");
        if (!status) throw new Error("status is required");
        if (!location) throw new Error("location is required");
        if (!recruiterId) throw new Error("recruiterId is required");
        if (!skills) throw new Error("skills is required");
        if (!createdAt) throw new Error("createdAt is required");
        if (!workModality) throw new Error("workModality is required")
        if (!requirements) throw new Error("requirements is required")
        if (!benefits) throw new Error("benefits is required")

        return new VacantEntity(id, title, description, salary, company, status, location, recruiterId, skills, createdAt, recruiter, requirements, benefits, workModality, applications, count, _count);
    }
}