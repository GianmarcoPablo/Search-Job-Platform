import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import getOneVacancy from "../../api/get-one-vacancy";
import { useVacanciesStore } from "../../store/vacancies.store";
import { formatMoney } from "../../helpers/format-money";
import { formatDate } from "../../helpers/format-date";
import { useAuthStore } from "../../store/auth-store";
import applyForTheVacant from "../../api/apply-for-the-vacant";
import { HeartIcon } from "@heroicons/react/24/solid"

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

export default function VacancyPage() {

    const { profile, role } = useAuthStore()

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["vacancy"],
        queryFn: () => getOneVacancy(Number(id)),
    });

    const applyVacant = async (vacancyId: number, userId: number) => {
        try {
            const data = await applyForTheVacant(vacancyId, userId)
            await refetch()
            return data
        } catch (error) {
            alert("Ya te postulaste a esta vacante")
        }
    }

    const { id } = useParams();

    const { setVacancy, vacancy } = useVacanciesStore()


    useEffect(() => {
        if (data) {
            setVacancy(data)
        }
    }, [data, setVacancy])

    const alreadyApply = useCallback(() => {
        const already = Array.isArray(vacancy?.applications) && vacancy.applications.some((application) => application.applicantId === profile?.id);

        if (already) {
            return true;
        }
        return false;
    }, [vacancy, profile])

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }


    return (
        <div className="px-6">
            <div className="bg-white shadow-md rounded-lg w-4/5 mx-auto p-8">
                <header className="bg-slate-800 text-white px-6 py-4 rounded-t-lg mb-6">
                    <h2 className="font-bold text-3xl">{vacancy.title}</h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="w-16 h-16 rounded-full"
                                src="/place.avif"
                                alt={vacancy.recruiter.user.firstName}
                            />
                        </div>
                        <div className="ml-3 text-lg">
                            <p className="font-bold text-lg">{vacancy.recruiter.user.firstName} {vacancy.recruiter.user.lastName} </p>
                            <p className="font-semibold text-base">Contactar al correo: <span className="font-normal">{vacancy.recruiter.user.email}</span></p>
                        </div>
                    </div>
                    <div className="flex-wrap gap-2">
                        <h3 className="font-semibold text-lg text-gray-600 mb-2">Habilidades:</h3>
                        {vacancy.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 p-2 rounded text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600">Salario:</h3>
                        <p className="text-xl">
                            {formatMoney(vacancy.salary)}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600">Empresa:</h3>
                        <p className="text-xl truncate hover:whitespace-normal">
                            {vacancy.company}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600">Beneficios:</h3>
                        <p className="text-xl truncate hover:whitespace-normal">
                            {vacancy.benefits}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600">Modalidad de Trabajo</h3>
                        <p className="text-xl truncate hover:whitespace-normal">
                            {vacancy.workModality}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600">Ubicacion:</h3>
                        <p className="text-xl truncate hover:whitespace-normal">
                            {vacancy.location}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600">Vacante Creada:</h3>
                        <p className="text-xl truncate hover:whitespace-normal">
                            {formatDate(vacancy.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-semibold text-gray-600 text-lg">Descripción:</h3>
                    <p className="text-gray-800">{vacancy.description}</p>
                </div>

                <div className="mb-8">
                    <h3 className="font-semibold text-lg text-gray-600">Requerimientos:</h3>
                    <p className="text-gray-800">{vacancy.requirements}</p>
                </div>

                <div className="md:flex justify-between items-center">
                    <div>
                        {profile && role === "applicant" ? (
                            <button
                                className="bg-red-500 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2 mb-2"
                            >
                                Agregar a favoritos
                                <HeartIcon className="h-5 w-5" />
                            </button>
                        ) : null}
                    </div>
                    <div>
                        {vacancy?.count?.applications === 1 ? (
                            <div
                                className={`
                              bg-green-700 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-green-800 transition-colors flex items-center gap-2`}
                            >
                                <p className="text-lg text-white font-semibold">{vacancy?.count?.applications} persona se postuló</p>
                            </div>
                        ) : (
                            <div
                                className={`bg-green-700 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-green-800 transition-colors flex items-center gap-2 w-fit mb-2`}
                            >
                                <p className="text-lg text-white font-semibold">{vacancy?.count?.applications} personas se postularon</p>
                            </div>
                        )}
                    </div>
                    <div>
                        {profile && role === "applicant" ? (
                            <button
                                onClick={() => applyVacant(vacancy.id, profile.id)}
                                disabled={alreadyApply()}
                                className={`bg-indigo-500 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2 mb-2 ${alreadyApply() ? "cursor-not-allowed" : ""}`}
                            >
                                {alreadyApply() ? "Ya te postulaste" : "Postularse"}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
