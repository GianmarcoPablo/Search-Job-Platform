import { Route, Routes, Navigate } from "react-router-dom"
import { HomePage } from "../pages"

export default function RecruiterRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/recruiter" />} />
        </Routes>
    )
}
