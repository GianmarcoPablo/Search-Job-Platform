import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HeaderSection from "../components/Header-Section";

export default function HomeLayout() {
    return (
        <div>
            <Navbar />
            <HeaderSection />
            <main>
                <Outlet />
            </main>
        </div>
    )
}