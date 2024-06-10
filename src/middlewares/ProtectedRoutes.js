import {jwtDecode} from "jwt-decode";
import {Outlet, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Login from "../pages/Login";
import {pem as jwt} from "node-forge";

const useAuth = () => {
    const [params] = useSearchParams()
    const tokenParams = params.get('token') ? params.get('token') : null;
    if (!tokenParams) {
        const token = localStorage.getItem('token');
        return token
    } else {
        localStorage.setItem('token', tokenParams)

        return tokenParams
    }
}

export const useSession = () => {
    const session = useAuth()
    const decodedSession = session ? jwtDecode(session) : null
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