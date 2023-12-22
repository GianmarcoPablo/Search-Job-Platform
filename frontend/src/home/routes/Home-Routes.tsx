import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home-Page";

export default function HomeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
