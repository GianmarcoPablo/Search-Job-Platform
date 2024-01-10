import instance from "../config/axios";

const getOneVacancy = async (id: number | null = 15) => {
    try {
        const { data } = await instance.get(`/api/v1/vacancies/${id}`);
        return data;
    } catch (error) {
        throw error
    }
};

export default getOneVacancy


