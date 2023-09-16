import { createContext, useState } from "react";

const UserContext = createContext(null);


export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null)

    const signIn = async (credentials) => {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        const password = credentials.password;
        const userId = credentials.userId;
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,

            }
        }; 

        const response = await fetch("http://localhost:5000/api/users", fetchOptions);
        if (response.status === 200) {
            console.log('response is 200')
            const user = await response.json();
            console.log(user);
            setAuthUser(user);
            return user
        } else if (response.status === 401) {
            console.log('response is 401')
            return null
        } else {
            throw new Error()
        }
    }


    const signOut = () => {
        setAuthUser(null);
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