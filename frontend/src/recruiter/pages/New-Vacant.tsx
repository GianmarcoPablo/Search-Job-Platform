import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import createVacancyApi from "../../api/create-vacant"
import { useVacanciesStore } from "../../store/vacancies.store"
import { useAuthStore } from "../../store/auth-store"
import { Vacancy } from "../../api/create-vacant"
import { useState } from "react"

export default function NewVacant() {

    const { profile } = useAuthStore()
    const { createVacancy } = useVacanciesStore()
    const [skillsInput, setSkillsInput] = useState<string>("")
    const [skillsTags, setSkillsTags] = useState<string[]>([])


    const navigate = useNavigate()

    const createVacancyFunction = useMutation({
        mutationFn: (data: any) => createVacancyApi(data),
        onSuccess: (data) => {
            createVacancy(data)
            navigate("/recruiter/vacancies")
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const title = data.get("title")
        const company = data.get("company")
        const location = data.get("location")
        const salary = data.get("salary")
        const description = data.get("description")
        const requirements = data.get("requirements")
        const benefits = data.get("benefits")
        const workModality = data.get("workModality")
        const status = data.get("status")

        const vacancy = {
            title,
            company,
            location,
            salary,
            description,
            requirements,
            benefits,
            workModality,
            status,
            skills: skillsTags
        }

        console.log(vacancy);

        if (Object.values(vacancy).some((value) => !value)) return alert("Todos los campos son requeridos")
        createVacancyFunction.mutate(vacancy)
    }


    return (
        <div className=" px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="md:w-1/2 mx-auto">
                <div className="flex items-center space-x-5">
                    <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed">Crear Vacante</h2>
                        <p className="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="flex flex-col">
                                <label className="leading-loose">Titulo de la vacante</label>
                                <input
                                    name="title"
                                    type="text"
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                    placeholder="Ejm: Programdor, Medico, Abogado, etc" />
                            </div>
                            <div className="flex flex-col">
                                <label className="leading-loose">Nombre de la empresa</label>
                                <input
                                    name="company"
                                    type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Ejm: Microsoft, Google, etc" />
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex flex-col">
                                    <label className="leading-loose">Ubicacion</label>
                                    <div className="relative focus-within:text-gray-600 text-gray-400">
                                        <input
                                            name="location"
                                            type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
                                        <div className="absolute left-3 top-2">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Sueldo</label>
                                    <div className="relative focus-within:text-gray-600 text-gray-400">
                                        <input
                                            name="salary"
                                            type="number" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Ejm: $1500" />
                                        <div className="absolute left-3 top-2">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="leading-loose">Descripcion del empleo</label>
                                <input
                                    name="description"
                                    type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Ejm: Necesitamos un señior en react" />
                            </div>
                            <div className="flex flex-col">
                                <label className="leading-loose">Requisitos</label>
                                <textarea
                                    name="requirements"
                                    rows={4}
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 no-resize"
                                    placeholder="Ejm: Necesitamos un señior en react"
                                >
                                </textarea>
                            </div>
                            <div className="flex flex-col">
                                <label className="leading-loose">Skills</label>
                                <div
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        name="skills"
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Ejm: Javascript, React, Node, etc"
                                        value={skillsInput}
                                        onChange={(e) => setSkillsInput(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="bg-blue-500  text-white rounded-md focus:outline-none h-auto px-4 py-1.5"
                                        onClick={() => {
                                            if (!skillsInput) return
                                            setSkillsTags([...skillsTags, skillsInput])
                                            setSkillsInput("")
                                        }}
                                    >
                                        Agregar
                                    </button>
                                </div>
                                <div
                                    className="flex flex-wrap gap-2 mt-2"
                                >
                                    {skillsTags.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                        >
                                            {skill} <span
                                                onClick={() => {
                                                    setSkillsTags(skillsTags.filter((_, i) => i !== index))
                                                }}
                                                className="text-gray-900 cursor-pointer">x</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="leading-loose">Beneficios</label>
                                <input
                                    name="benefits"
                                    type="text"
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                    placeholder="Ejm: Seguro medico, Seguro de vida, etc"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="leading-loose">Modalidad</label>
                                <select
                                    name="workModality"
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Freelance</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="leading-loose">Status</label>
                                <select
                                    name="status"
                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                >
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                            <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancelar
                            </button>
                            <button
                                type="submit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                    }
                                }}
                                className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                Crear
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
