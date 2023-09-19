import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PrivateRoute = () => {
    // Pulls Authenticated User from UserContext
    const { authUser } = useContext(UserContext)
    // sets location hook
    const location = useLocation();

    if (authUser) {
        return <Outlet />
    } else {
        // saves previous location to the state until user is signed in
        return <Navigate to="/signin" state={{ from: location.pathname }} />
    }

}

export default PrivateRoute;