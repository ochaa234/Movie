import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout(){
        localStorage.clear()
        navigate("/login")
    }

    return (
        <>
        <nav className="flex bg-blue-950 text-white justify-between items-center px-6 py-3">
            <h1 className="font-bold text-2xl">Chazha</h1>
            <div className="flex gap-5">
                {/* <NavLink className="hover:text-blue-400 hover:underline transition duration-300" to="/">Home</NavLink> */}
                <NavLink className={({ isActive }) =>
                    isActive ? "hover:text-blue-400 hover:underline transition duration-300" : "hover:text-blue-400 transition duration-300"
                } to="/">Home</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "hover:text-blue-400 hover:underline transition duration-300" : "hover:text-blue-400 transition duration-300"
                } to="/add">Add Movie</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "hover:text-blue-400 hover:underline transition duration-300" : "hover:text-blue-400 transition duration-300"
                } to="">Movies</NavLink>
                <NavLink className="hover:text-blue-400 hover:underline transition duration-300" to="">Genres</NavLink>
                <NavLink className="hover:text-blue-400 hover:underline transition duration-300" to="">Search</NavLink>
                <NavLink onClick={handleLogout} className="hover:text-blue-400 hover:underline transition duration-300">Logout</NavLink>
                <NavLink className="hover:text-blue-400 hover:underline transition duration-300" to="">Login</NavLink>
            </div>
        </nav>
        </>
    )
}