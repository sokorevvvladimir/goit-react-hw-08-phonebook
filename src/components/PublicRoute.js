import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { authSelectors } from "redux/auth";

const PublicRoute = ({ restricted = false, redirectTo = "/" }) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
    const shouldRedirect = isLoggedIn && restricted;

    return shouldRedirect ? <Navigate to={redirectTo}/> : <Outlet/>
 };
export default PublicRoute;