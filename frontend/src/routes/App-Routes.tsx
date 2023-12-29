import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "../auth/routes/Auth-Routes";
import PostulantRoutes from "../postulant/routes/Postulant-Routes";
import RecruiterRoutes from "../recruiter/routes/Recruiter-Routes";
import { useAuthStore } from "../store/auth-store";
import HomeLayout from "../home/layout/Home-Layout";
import { HomePage, VacancyPage } from "../home/pages";

export default function AppRoutes() {
    const { isAuth, role } = useAuthStore();

    if (isAuth === "checking") return <div>Checking...</div>

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/favorites-jobs" element={<h1>Favorites Jobs</h1>} />
                <Route path="/vacancy/:id" element={<VacancyPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Route>
            {
                isAuth === "authenticated"
                    ? isAuth === "authenticated" && role === "applicant"
                        ? <Route path="/postulant/*" element={<PostulantRoutes />} />
                        : isAuth === "authenticated" && role === "recruiter"
                            ? <Route path="/recruiter/*" element={<RecruiterRoutes />} />
                            : <Route path="/auth/*" element={<AuthRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<h1>Not fount</h1>} />
        </Routes>
    )
}
