import {jwtDecode} from "jwt-decode";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Login from "../pages/Login";

const useAuth = () => {
    const token = localStorage.getItem('token');

    return token
}

export const useSession = () => {
    const session = useAuth()
    const decodedSession = jwtDecode(session)
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate("/login");
        }
    }, [navigate, session]);

    return decodedSession
}

const ProtectedRoutes = () => {
    const isAuthorized = useAuth()

    return isAuthorized ? <Outlet /> : <Login />
}

export default ProtectedRoutes;