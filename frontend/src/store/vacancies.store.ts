import { create } from "zustand";


interface Recruiter {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    }
}

export interface Vacancy {
    id: number;
    title: string;
    description: string;
    salary: number;
    company: string;
    location: string;
    createdAt: string;
    recruiter: Recruiter;
    applications: any[];
    skills: any[];
    requirements: string;
    benefits: string;
    workModality: string;
    count?: any;
    _count: {
        applications: number;
    },
}

type State = {
    vacancies: [],
    vacanciesRecruiter: [],
    vacancy: Vacancy,
    loading: boolean
}

type Actions = {
    setVacancies: (vacancies: []) => void,
    setVacancy: (vacancy: Vacancy) => void,
    setVacanciesRecruiter: (vacanciesRecruiter: []) => void
    createVacancy: (vacancy: Vacancy) => void
}


export const useVacanciesStore = create<State & Actions>((set) => ({
    vacancies: [],
    vacanciesRecruiter: [],
    loading: false,
    vacancy: {
        id: 0,
        title: '',
        description: '',
        salary: 0,
        company: '',
        location: '',
        createdAt: '',
        applications: [],
        recruiter: {
            user: {
                id: 0,
                email: '',
                firstName: '',
                lastName: ''
            }
        },
        skills: [],
        requirements: '',
        benefits: '',
        workModality: '',
        count: {
            applications: 0
        },
        _count: {
            applications: 0
        },
    },

    setVacancies: (vacancies: []) => set(() => ({
        vacancies
    })),
    setVacancy: (vacancy: Vacancy) => set(() => ({
        vacancy
    })),

    setVacanciesRecruiter: (vacanciesRecruiter: []) => set(() => ({
        vacanciesRecruiter,
    })),

    createVacancy: (vacancy: Vacancy) => set(() => ({
        vacancy
    }) as any)
}))