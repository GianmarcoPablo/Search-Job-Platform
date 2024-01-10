export class UserRegisterDto {
    private constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly password: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly role: string,
        public readonly phone?: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, UserRegisterDto?] {

        const { id, email, password, firstName, lastName, role, phone } = props;

        const exp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

        if (!email) return ["email is required"];
        if (!exp.test(email)) return ["email is invalid"];
        if (!password) return ["password is required"];
        if (password.length < 8) return ["password must be at least 8 characters"];
        if (!firstName) return ["firstName is required"];
        if (firstName.length < 3) return ["firstName must be at least 3 characters"];
        if (!lastName) return ["lastName is required"];
        if (lastName.length < 3) return ["lastName must be at least 3 characters"];
        if (!role) return ["role is required"];
        if (role.length < 1) return ["role must be at least 1 characters"];


        return [undefined, new UserRegisterDto(id, email, password, firstName, lastName, role, phone)];
    }
}