import instance from "../config/axios";

const getVacantsRecruiter = async () => {
    try {
        const { data } = await instance.get(`/api/v1/vacancies/by/recruiter`);
        return data;
    } catch (error) {
        throw error
    }
};

export default getVacantsRecruiter


