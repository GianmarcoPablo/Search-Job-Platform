import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth-store"
import { Disclosure } from '@headlessui/react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/solid'

export default function Navbar() {

    const { isAuth, logout, role } = useAuthStore();

    const logoutHandler = () => {
        logout();
        //recargar la pagina
        window.location.reload();
    }


    return (
        <Disclosure as="nav">

            {({ open }) => (
                <>
                    <div className="bg-slate-800 py-3">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">

                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Link to="/">
                                            <img
                                                className="h-12 w-12"
                                                src="../logo.jpg"
                                                alt="Workflow"
                                            />
                                        </Link>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">

                                            <Link
                                                to="/"
                                                className="bg-slate-900 text-white px-3 py-2 rounded-md text-lg font-medium"
                                            >
                                                Inicio
                                            </Link>

                                            <Link
                                                to="/favorites-jobs"
                                                className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                            >
                                                Favoritos
                                            </Link>


                                            {isAuth && role === "recruiter" ? (
                                                <Link
                                                    to="/recruiter"
                                                    className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                                >
                                                    Reclutador
                                                </Link>
                                            ) : (
                                                isAuth && role === "applicant" ? (
                                                    <Link
                                                        to="/postulant"
                                                        className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                                    >
                                                        Postulante
                                                    </Link>
                                                ) : (
                                                    null
                                                )
                                            )}


                                            {isAuth === "authenticated" ? (
                                                <button onClick={logoutHandler}
                                                    className="bg-red-700 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-red-600 transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            ) : (
                                                <Link
                                                    to="/auth/login"
                                                    className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                                >
                                                    Iniciar Session
                                                </Link>
                                            )}


                                        </div>
                                    </div>
                                </div>

                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars2Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    to="/"
                                    className="bg-slate-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Inicio
                                </Link>

                                <Link
                                    to="/favorites-jobs"
                                    className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Favoritos
                                </Link>

                                {isAuth && role === "recruiter" ? (
                                    <Link
                                        to="/recruiter"
                                        className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Reclutador
                                    </Link>
                                ) : (
                                    isAuth && role === "applicant" ? (
                                        <Link
                                            to="/postulant"
                                            className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                        >
                                            Postulante
                                        </Link>
                                    ) : (
                                        null
                                    )
                                )}

                            </div>
                            <div className="pt-4 pb-3 border-t border-slate-700">
                                {isAuth === "authenticated" ? (
                                    <div className="px-5">
                                        <button onClick={logoutHandler} className="block w-full text-white bg-red-700 px-4 py-2 rounded-md hover:bg-red-600">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/auth/login"
                                        className="block w-full px-5 py-3 text-center font-medium text-white bg-slate-600 rounded-md hover:bg-slate-500"
                                    >
                                        Iniciar Session
                                    </Link>
                                )}

                            </div>
                        </Disclosure.Panel>
                    </div>
                </>
            )}

        </Disclosure>
    )
}