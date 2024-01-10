import { useNavigate } from "react-router-dom";
import { VacancyProps } from "../pages/Home-Page"
import { formatDate } from "../../helpers/format-date";
import "tailwindcss-animated"

export default function Vacancy(props: { vacancy: VacancyProps }) {
    const { id, title, description, location, salary, company, skills, createdAt } = props.vacancy;                                                                 
    
    const navigate = useNavigate();

    return (
        <div className="animate-fade-right">
            <div
                key={id}
                className="group bg-slate-800 shadow-lg rounded-md p-6 transition-transform transform hover:scale-105 text-white min-h-[26rem] flex flex-col justify-between"
            >
                <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
                <p className="text-lg text-white mb-1">Empresa: {company}</p>
                <p className="text-lg text-white mb-1">Ubicación: {location}</p>
                <p className="text-lg text-white mb-3">{description}</p>
                <p className="text-lg text-white mb-3">Salario: ${salary}</p>
                <p className="text-lg text-white mb-3">Vacante creada: {formatDate(createdAt)}</p>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                        <span key={skill} className="text-sm bg-white font-bold text-black px-3 py-1 rounded-md">
                            {skill}
                        </span>
                    ))}
                </div>
                <button
                    className="bg-rose-600 w-full py-2 mt-4 text-white font-bold rounded-md hover:bg-rose-700 transition-colors"
                    onClick={() => navigate(`/vacancy/${id}`)}
                >
                    Ver mas
                </button>
            </div>
        </div>
    );
}

