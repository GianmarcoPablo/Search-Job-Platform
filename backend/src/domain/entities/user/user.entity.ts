export class UserEntity {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly lastName: string,
        public readonly firstName: string,
        public readonly token?: string,
        public readonly applicant?: any,
        public readonly recruiter?: any,
        public readonly phone?: number,
    ) { }

    public static fromObject(obj: { [key: string]: any }): UserEntity {

        const { id, email, password, role, lastName, firstName, token, applicant, recruiter, phone } = obj;

        if (!id) throw new Error("id is required");
        if (!email) throw new Error("email is required");
        if (!password) throw new Error("password is required");
        if (!role) throw new Error("role is required");
        if (!lastName) throw new Error("lastName is required");
        if (!firstName) throw new Error("firstName is required");

        return new UserEntity(id, email, password, role, lastName, firstName, token, applicant, recruiter, phone);
    }
}

