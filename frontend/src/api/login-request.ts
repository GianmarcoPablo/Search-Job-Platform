import instance from "../config/axios";

export interface LoginRequest {
    email: string;
    password: string;
}

const loginRequest = async (params: LoginRequest) => {
    const { email, password } = params
    try {
        const { data } = await instance.post('/api/v1/users/login', {
            email,
            password
        });
        return data;
    } catch (error: any) {
        throw error
    }
};

export default loginRequest;

