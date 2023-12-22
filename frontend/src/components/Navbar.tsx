import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth-store"

export default function Navbar() {

    const { isAuth, logout } = useAuthStore();

    const logoutHandler = () => {
        logout();
        //recargar la pagina
        window.location.reload();
    }


    return (
        <header
            className="bg-blue-800 py-4"
        >
            <nav
                className="container mx-auto"
            >
                <div className="flex justify-between items-center">
                    <Link
                        className="text-white font-bold text-lg hover:text-"
                        to="/">Inicio</Link>
                    <Link
                        className="text-white font-bold text-lg"
                        to="/favorites-jobs">Favoritos</Link>
                    {
                        isAuth === "authenticated"
                            ?
                            <button
                                onClick={logoutHandler}
                                className="text-white font-bold text-lg bg-red-700 px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            >
                                Logout
                            </button>
                            : <Link
                                className="text-white font-bold text-lg"
                                to="/auth/login">Iniciar Session</Link>
                    }
                </div>
            </nav>
        </header>
    )
}