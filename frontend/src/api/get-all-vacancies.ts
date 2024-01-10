import instance from "../config/axios";



const getAllVacancies = async () => {
    try {
        const { data } = await instance.get('/api/v1/vacancies');
        return data;
    } catch (error) {
        throw error
    }
};

export default getAllVacancies;

