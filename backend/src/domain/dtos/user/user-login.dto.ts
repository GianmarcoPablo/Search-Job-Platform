export class UserLoginDto {

    private constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
    ) { }


    static create(props: { [key: string]: any }): [string?, UserLoginDto?] {

        const { id, email, password } = props;
        if (!email) return ["email is required"];
        if (!password) return ["password is required"];

        return [undefined, new UserLoginDto(id, email, password)];
    }
}