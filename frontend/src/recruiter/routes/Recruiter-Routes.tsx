import { Route, Routes, Navigate } from "react-router-dom"
import LayoutRecruiter from "../layout/Layout"
import { HomePage, CandidatesRecruiterPage, VacanciesRecruiterPage, ProfilePage, NewVacant, VacacyRecruiter } from "../pages"

export default function RecruiterRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LayoutRecruiter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/vacancies" element={<VacanciesRecruiterPage />} />
                <Route path="/vacancies/create-vacancy" element={<NewVacant />} />
                <Route path="/vacancies/vacancy/:id" element={<VacacyRecruiter />} />
                <Route path="/candidates" element={<CandidatesRecruiterPage />} />
                <Route path="/candidates/all/:id" element={<h1>Hola</h1>} />
                <Route path="/*" element={<Navigate to="/recruiter" />} />
            </Route>
        </Routes>
    )
}
