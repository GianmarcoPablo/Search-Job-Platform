import instance from "../config/axios";

export interface Vacancy {
    title: string; 
    company: string;
    location: string;
    salary: number;
    description: string;
    requirements: string;
    skills: string[];
    benefits: string;
    workModality: string;
    category: string;
}


const createVacancyApi = async (vacancy: Vacancy) => {
    try {
        const { data } = await instance.post('/api/v1/vacancies', vacancy);
        return data;
    } catch (error: any) {
        console.log(error);
        throw error
    }
};

export default createVacancyApi;

