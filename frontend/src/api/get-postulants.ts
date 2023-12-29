import instance from "../config/axios";

const getPostulants = async () => {
    try {
        const { data } = await instance.get(`/api/v1/applicants`);
        if (!data) throw new Error('No data')
        return data;
    } catch (error) {
        throw error
    }
};
export default getPostulants


