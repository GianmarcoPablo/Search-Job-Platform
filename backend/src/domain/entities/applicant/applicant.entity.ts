export class AplicantEntity {
    constructor(
        public readonly id: string,
        public readonly date: string,
        public readonly applicantId: string,
        public readonly jobId: string,
        public readonly applicant?: any,
    ) { }

    public static fromObject(obj: { [key: string]: any }): AplicantEntity {

        const { id, date, applicantId, jobId, applicant } = obj;

        if (!id) throw new Error("id is required");
        if (!date) throw new Error("date is required");
        if (!applicantId) throw new Error("applicantId is required");
        if (!jobId) throw new Error("jobId is required");

        return new AplicantEntity(id, date, applicantId, jobId, applicant);
    }
}