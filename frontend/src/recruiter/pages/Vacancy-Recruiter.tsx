import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import getOneVacancy from "../../api/get-one-vacancy";
import { useVacanciesStore } from "../../store/vacancies.store";
import { formatDate } from "../../helpers/format-date";
import { formatMoney } from "../../helpers/format-money";
import { Menu } from '@headlessui/react'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'



export default function VacancyRecruiter() {

    const { id } = useParams();

    const { vacancy, setVacancy } = useVacanciesStore()
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["vacants"],
        queryFn: () => getOneVacancy(Number(id)),
    })

    useEffect(() => {
        if (data) {
            setVacancy(data)
        }
    }, [data])

    if (isFetching) {
        return (
            <div className="text-center mt-8">Loading...</div>
        )
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    console.log(vacancy);

    return (
        <div className="md:px-6 px-2">
            <div className="bg-slate-800 shadow-md rounded-lg md:w-4/5 mx-auto p-8">
                <header className="bg-rose-900 text-white px-6 py-4 rounded-t-lg mb-6 flex justify-between">
                    <h2 className="font-bold text-3xl">{vacancy.title}</h2>
                    <div>
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <Menu.Button
                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-rose-700 text-white rounded-md hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            >
                                Opciones
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg p-1 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to={`/vacancy/${vacancy.id}/edit`}
                                            className={`text-black flex justify-between px-3 py-1 ${active && 'bg-gray-100'}`}
                                        >
                                            Editar
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => { }}
                                            className={`text-black flex justify-between px-3 py-1 ${active && 'bg-gray-100'}`}
                                        >
                                            Eliminar
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </header>

                <main >
                    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        <div className="flex items-center text-white">
                            <div className="flex-shrink-0">
                                <img
                                    className="w-16 h-16 rounded-full"
                                    src="/place.avif"
                                    alt={vacancy?.recruiter?.user?.firstName}
                                />
                            </div>
                            <div className="ml-3 text-lg">
                                <p className="font-bold text-lg">{vacancy?.recruiter?.user?.firstName} {vacancy?.recruiter?.user?.lastName} </p>
                                <p className="font-semibold text-base">Contactar al correo: <span className="font-normal">{vacancy?.recruiter?.user?.email}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-white">Modalidad de Trabajo</h3>
                            <p className="text-xl truncate hover:whitespace-normal text-green-300">
                                {vacancy.workModality}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-white">Salario:</h3>
                            <p className="text-xl truncate hover:whitespace-normal text-yellow-300">
                                {formatMoney(vacancy.salary)}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-white">Empresa:</h3>
                            <p className="text-xl truncate hover:whitespace-normal text-fuchsia-300">
                                {vacancy.company}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-white">Beneficios:</h3>
                            <p className="text-xl truncate hover:whitespace-normal text-red-300">
                                {vacancy.benefits}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-white">Ubicacion:</h3>
                            <p className="text-xl truncate hover:whitespace-normal text-blue-300">
                                {vacancy.location}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-white">Vacante Creada:</h3>
                            <p className="text-xl truncate hover:whitespace-normal text-orange-300">
                                {formatDate(vacancy.createdAt)}
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold text-white text-lg">Descripción:</h3>
                        <p className="text-white">{vacancy.description}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold text-lg text-white">Requerimientos:</h3>
                        <p className="text-white">{vacancy.requirements}</p>
                    </div>

                    <div >
                        <h3 className="font-semibold text-lg text-white mb-2">Habilidades:</h3>
                        <div className="flex flex-wrap gap-2">
                            {vacancy?.skills?.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 p-2 rounded text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:flex justify-between items-center">
                        <div>
                            {vacancy.count?.applications > 0 ? (
                                <h3 className="font-semibold text-lg text-white mb-2">Postulaciones:
                                    <span className="font-normal"> {vacancy.count.applications}</span>
                                </h3>
                            ) : (
                                <h3 className="font-semibold text-lg text-white mb-2">No hay postulaciones</h3>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-white mb-2">Postulantes:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {vacancy?.applications?.length > 0 ? (
                                <>
                                    {
                                        vacancy.applications?.map((applicants) => {
                                            const { user } = applicants.applicant
                                            return (
                                                <div key={user.id} className="bg-slate-700 shadow-md rounded-lg p-4">
                                                    <div className="flex items-center text-white">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="w-16 h-16 rounded-full"
                                                                src="/place.avif"
                                                                alt={user.firstName}
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-lg">
                                                            <p className="font-bold text-lg">{user.firstName} {user.lastName} </p>
                                                            <p className="font-semibold text-base">Contactar al correo: <span className="font-normal">{user.email}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <p className="text-white">No hay postulantes</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
