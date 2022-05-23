import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';
import { authSelectors } from "redux/auth";

const PrivateRoute = ({redirectTo = "/"}) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

return isLoggedIn ? <Outlet/> : <Navigate to={redirectTo}/>
 };

export default PrivateRoute;