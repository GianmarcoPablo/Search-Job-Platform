export class CreateApplicantDto {
    constructor(
        public readonly date: Date,
        public readonly applicantId: number,
        public readonly jobId: number,
    ) { }


    static create(props: { [key: string]: any }): [string?, CreateApplicantDto?] {
        const { date, applicantId, jobId } = props;

        if (!date) return ["date is required"];
        if (!applicantId) return ["applicantId is required"];
        if (!jobId) return ["jobId is required"];

        return [undefined, new CreateApplicantDto(date, applicantId, jobId)];
    }
}