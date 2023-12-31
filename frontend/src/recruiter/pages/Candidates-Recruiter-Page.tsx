import { useQuery } from "@tanstack/react-query"
import getPostulants from "../../api/get-postulants"
import { Link } from "react-router-dom"

export default function CandidatesRecruiterPage() {

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['postulants'],
        queryFn: getPostulants
    })

    if (isFetching) return <div>Fetching...</div>
    if (isLoading) return <div>Loading...</div>



    return (
        <div>
            <h1>Postulants</h1>
            <div
                className="grid grid-cols-3 gap-4"
            >
                {data?.map((postulant: any) => {
                    const { user, education, experience } = postulant.applicant
                    return (
                        <div
                            className="bg-gray-200 p-4 flex flex-col justify-between"
                            key={postulant.id}>
                            <h2>{user.firstName} {user.lastName}</h2>
                            <p>{user.email}</p>
                            <p>
                                {education === null ? 'No education' : education}
                            </p>
                            <p>
                                {
                                    experience === null ? 'No experience' : experience
                                }
                            </p>

                            <Link
                                to={`/recruiter/candidates/all/${postulant?.id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Ver postulante
                            </Link>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
