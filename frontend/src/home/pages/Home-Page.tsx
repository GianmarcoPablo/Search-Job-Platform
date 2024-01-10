import { useQuery } from "@tanstack/react-query";
import getAllVacancies from "../../api/get-all-vacancies";
import Vacancy from "../components/Vacancy";
import { useVacanciesStore } from "../../store/vacancies.store";
import { useEffect } from "react";

export interface VacancyProps {
    id: number;
    title: string;
    description: string;
    location: string;
    salary: number;
    company: string;
    skills: string[];
    createdAt: string;
}

export function Loader() {
    return (
        <div className="flex mx-auto justify-center items-center align-middle">
            <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                </svg>
                <span className="text-4xl font-medium text-gray-500">Loading...</span>
            </div>
        </div>
    )
}

export default function HomePage() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["vacancies"],
        queryFn: getAllVacancies,
    });

    const { setVacancies, vacancies } = useVacanciesStore()

    useEffect(() => {
        if (data) {
            setVacancies(data)
        }
    }, [data, setVacancies])


    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <div className="my-5">
            <h1 className="text-4xl font-bold text-center text-slate-800 mb-6 underline">
                Empleos Disponibles
            </h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vacancies?.map((vacancy: VacancyProps) =>
                        <Vacancy
                            key={vacancy.id}
                            vacancy={vacancy}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
