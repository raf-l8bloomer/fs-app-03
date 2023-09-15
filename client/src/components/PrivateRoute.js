import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext)

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" />
    }

}

export default PrivateRoute;