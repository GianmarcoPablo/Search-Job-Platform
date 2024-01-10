import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Vacancy, useVacanciesStore } from "../../store/vacancies.store";
import getVacantsRecruiter from "../../api/get-vacant-recruiter";
import { formatDate } from "../../helpers/format-date";
import { formatMoney } from "../../helpers/format-money";
import { useAuthStore } from "../../store/auth-store";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from '@heroicons/react/24/solid'

const HomePage = () => {
    const { vacanciesRecruiter, setVacanciesRecruiter } = useVacanciesStore();
    const { profile } = useAuthStore();
    const { data, isLoading } = useQuery({
        queryKey: ["vacants"],
        queryFn: () => getVacantsRecruiter(),
    });

    useEffect(() => {
        if (data) {
            setVacanciesRecruiter(data);
        }
    }, [data]);

    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="p-4 md:p-8 lg:p-16">
            {/* Perfil Info */}
            <div className="bg-slate-800 text-white rounded-md p-4 md:p-8 lg:p-12 mb-8">
                <h1 className="text-2xl font-bold mb-2">Información de perfil</h1>
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                        <h2 className="mb-2">{profile?.firstName} {profile?.lastName}</h2>
                        <p className="mb-2">{profile?.role}</p>
                        <p>{profile.email}</p>
                    </div>
                    <div className="flex gap-3 mt-2 md:mt-0">
                        <p>¿Quieres realizar algún cambio?</p>
                        <Link to="profile" className="text-blue-500 hover:underline">Editar perfil</Link>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-md p-4 md:p-8 lg:p-12">
                <h2 className="text-2xl font-bold mb-4">Has creado {vacanciesRecruiter.length} vacantes</h2>
                <Link to="vacancies/create-vacancy" className="flex items-center text-green-500 hover:underline">
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Crear nueva vacante
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {vacanciesRecruiter?.slice(0, 3).map((vacancy: Vacancy) => (
                        <div key={vacancy.id} className="bg-gray-100 p-4 rounded-md">
                            <h1 className="text-xl font-bold mb-2">{vacancy.title}</h1>
                            <p className="text-gray-600 mb-2">{vacancy.description}</p>
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="text-gray-600">{vacancy.company}</p>
                                    <p className="text-sm text-gray-500">{formatDate(vacancy.createdAt)}</p>
                                </div>
                                <p className="text-green-600 font-semibold">{formatMoney(vacancy.salary)}</p>
                            </div>
                            <p className="text-gray-600 mb-2">{vacancy.location}</p>
                            <div className="flex flex-wrap gap-2">
                                {vacancy.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-2">
                                <Link to={`vacancies/vacancy/${vacancy.id}`} className="text-blue-500 hover:underline">Ver más</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-center">
                    <Link to="vacancies" className="text-blue-500 hover:underline">Ver todas las vacantes</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
