import { createContext, useState } from "react";
import Cookies from "js-cookie"

const UserContext = createContext(null);

// settomg up provider so that all components have access to the user info
export const UserProvider = (props) => {
    // sets cookie and pulls authenticatedUser
    const cookie = Cookies.get("authenticatedUser");

    // sets User state and initializes it with saved, signed in user from cookie
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    // receives Users credentials and encodes it
    const signIn = async (credentials) => {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
       
       // sends Get request to pull users data for matching 
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,

            }
        }; 

        const response = await fetch("http://localhost:5000/api/users", fetchOptions);
        if (response.status === 200) {
            const user = await response.json();
            user.password = credentials.password;
            console.log(user);
            setAuthUser(user);
            Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
            return user
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error()
        }
    }


    // sets user to null and removes the saved user from cookie
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
    }


    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut
            }
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;