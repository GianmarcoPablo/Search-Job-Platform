import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages";

export default function PostulantRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/postulant" />} />
        </Routes>
    )
}
