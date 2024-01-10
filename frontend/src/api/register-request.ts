import instance from "../config/axios";

export interface LoginRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const registerRequest = async (params: LoginRequest) => {
    const { email, password, firstName, lastName } = params
    try {
        const { data } = await instance.post('/api/v1/users/register', {
            firstName,
            lastName,
            email,
            password
        });
        return data;
    } catch (error) {
        throw error
    }
};

export default registerRequest;

