
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
                        <button className="bg-slate-800 text-white font-bold px-6 py-3 rounded-none md:rounded-r-md hover:bg-slate-600 transition-colors duration-300">
                            Buscar Trabajo
                        </button>
                    </div>
                </div>

            </header>

        </>
    );
}
