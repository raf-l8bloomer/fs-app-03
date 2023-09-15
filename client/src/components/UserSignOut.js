/**
 * DOES NOT Render any visual elements
 * Signs out Auth User 
 * redirects user to list of courses
 */

import { useEffect, useContext} from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignOut = () => {
    const {actions} = useContext(UserContext)

    useEffect(() => actions.signOut());

    return (
        <Navigate to="/" replace />
    )


}

export default UserSignOut;