import { Routes, Route } from "react-router-dom";
import AuthRoutes from "../auth/routes/Auth-Routes";
import PostulantRoutes from "../postulant/routes/Postulant-Routes";
import RecruiterRoutes from "../recruiter/routes/Recruiter-Routes";
import HomeRoutes from "../home/routes/Home-Routes";
import { useAuthStore } from "../store/auth-store";
import HomeLayout from "../home/layout/Home-Layout";

export default function AppRoutes() {
    const { isAuth, role } = useAuthStore();

    if (isAuth === "checking") return <div>Checking...</div>

    //if (isAuth === "authenticated" && role === "recruiter") return <Navigate to="/recruiter" />
    //if (isAuth === "authenticated" && role === "applicant") return <Navigate to="/postulant" />

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />} >
                <Route index element={<HomeRoutes />} />
                <Route path="favorites-jobs" element={<h1>Favorites Jobs</h1>} />
                <Route
                    path="recents-searches"
                    element={<h1>Recents Searches</h1>}
                />
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
