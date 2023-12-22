import { useQuery } from "@tanstack/react-query";
import getAllVacancies from "../../api/get-all-vacancies";

export interface Vacancy {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    company: string;
    skills: string[];
}

export default function HomePage() {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["vacancies"],
        queryFn: getAllVacancies,
    });

    if (isLoading) {
        return (
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
                    Cargando...
                </h1>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
                    Error: {error.message}
                </h1>
            </div>
        );
    }

    return (
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-4xl font-bold text-center text-blue-800 mb-6 underline">
                    Empleos Disponibles
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data?.map((vacancy: Vacancy) => {
                        return (
                            <div
                                key={vacancy.id}
                                className="bg-white shadow-md rounded-md p-6 transition-transform transform hover:scale-105"
                            >
                                <h2 className="text-xl font-bold text-blue-800 mb-2">
                                    {vacancy.title}
                                </h2>
                                <p className="text-sm text-gray-700 mb-4">{vacancy.description}</p>
                                <p className="text-sm text-gray-700 mb-2">{vacancy.location}</p>
                                <p className="text-sm text-gray-700 mb-2">${vacancy.salary}</p>
                                <p className="text-sm text-gray-700 mb-4">{vacancy.company}</p>
                                <div className="flex flex-wrap gap-2">
                                    {vacancy.skills.map((skill: string) => (
                                        <span
                                            key={skill}
                                            className="text-sm bg-purple-800 text-white px-2 py-1 rounded-md"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
