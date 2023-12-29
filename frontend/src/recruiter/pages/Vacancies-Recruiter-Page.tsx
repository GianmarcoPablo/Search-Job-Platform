import { useVacanciesStore } from "../../store/vacancies.store"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { formatDate } from "../../helpers/format-date"
import { Vacancy } from "../../store/vacancies.store"
import { formatMoney } from "../../helpers/format-money"
import { PlusCircleIcon, BriefcaseIcon } from "@heroicons/react/24/solid"
import getVacantsRecruiter from "../../api/get-vacant-recruiter"

export default function VacanciesRecruiterPage() {

    const { vacanciesRecruiter } = useVacanciesStore();

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["vacants"],
        queryFn: () => getVacantsRecruiter(),
    });

    if (isLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (isFetching) {
        return <div className="text-center mt-8">Fetching...</div>;
    }


    return (
        <div>
            <div className="flex justify-between">
                <div className="font-bold  bg-cyan-800 px-3 text-white uppercase py-2 flex items-center">
                    <h2>
                        Has creado {vacanciesRecruiter.length} vacantes
                        <span>
                            <BriefcaseIcon className="h-5 w-5 inline-block ml-2" />
                        </span>
                    </h2>
                </div>
                <div className="font-bold  bg-green-800 px-3 text-white uppercase py-2 flex items-center ">
                    <Link to="create-vacancy">
                        Crear nueva vacante
                        <span>
                            <PlusCircleIcon className="h-5 w-5 inline-block ml-2" />
                        </span>
                    </Link>
                </div>

            </div>

            {data.length === 0 ? (
                <div className="text-center mt-8">No has creado ninguna vacante</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {
                        Array.isArray(data) && data.map((vacancy: Vacancy) => (
                            <div key={vacancy.id} className="bg-slate-800 text-white p-4 rounded-md">
                                <h1 className="text-xl font-bold mb-2 text-yellow-500">Titulo: {vacancy.title}</h1>
                                <p className="mt-2 text-blue-300">Descripción: <span className="text-white">{vacancy.description}</span></p>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <p className="mb-2 text-violet-300">Empresa: <span className="text-white">{vacancy.company}</span></p>
                                        <p className="text-orange-300">Fecha: <span className="text-white">{formatDate(vacancy.createdAt)}</span></p>
                                    </div>
                                    <p className="text-green-400 font-semibold">Sueldo: {formatMoney(vacancy.salary)}</p>
                                </div>
                                <p className="mb-2 text-red-300">Ubicación: <span className="text-white">{vacancy.location}</span></p>
                                <div className="flex flex-wrap gap-2">
                                    <p className="text-blue-300">Habilidades: </p>
                                    {vacancy.skills.map((skill, index) => (
                                        <span
                                            className="bg-blue-700 px-3 py-1 rounded-full text-sm font-semibold text-white"
                                            key={index} >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Link to={`vacancy/${vacancy.id}`} className="text-white bg-rose-600 px-3 py-1 uppercase font-semibold">Ver más</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}
