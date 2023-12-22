import { Link } from "react-router-dom";

export default function HeaderSection() {
    return (
        <>
            <header className=" py-4">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
                    <div className="w-full lg:w-2/3 lg:mr-4 mb-4 lg:mb-0">
                        <input
                            type="search"
                            placeholder="Titulo del empleo o palabra clave"
                            className="w-full p-3 bg-white border border-gray-300 rounded-l-md focus:outline-none shadow-md"
                        />
                    </div>
                    <div>
                        <button className="bg-blue-800 text-white font-bold px-6 py-3 rounded-none md:rounded-r-md hover:bg-blue-600 transition-colors duration-300">
                            Buscar Trabajo
                        </button>
                    </div>
                </div>

                <div
                    className="w-1/2 md:w-1/3 mt-5 mx-auto"
                >
                    <nav
                        className="flex gap-3 justify-between items-center"
                    >
                        <Link
                            className="text-blue-800 font-bold text-lg border-b-2 border-blue-800 hover:border-blue-600 transition-colors duration-300 hover:text-blue-600"
                            to="/"
                        >
                            Empleos
                        </Link>
                        <Link
                            className="text-blue-800 font-bold text-lg border-b-2 border-blue-800 hover:border-blue-600 transition-colors duration-300 hover:text-blue-600"
                            to="/favorites-jobs"
                        >
                            favoritos
                        </Link>
                        <Link
                            className="text-blue-800 font-bold text-lg border-b-2 border-blue-800 hover:border-blue-600 transition-colors duration-300 hover:text-blue-600  "
                            to="/recents-searches"
                        >
                            Recientes
                        </Link>
                    </nav>
                </div>
            </header>

        </>
    );
}
