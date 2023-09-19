/**
 * renders a form for sign in 
 * renders "Sign In" button that signs in user
 * renders "Cancel" button that returns user to list of courses
 */

import { useRef, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    // imports Sign In function in User Context
    const { actions } = useContext(UserContext);
    // setting up navigate for routing
    const navigate = useNavigate();
    // sets location hook
    const location = useLocation();

    // sets User info state
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // Signs in User
    const handleSubmit = async (e) => {
        e.preventDefault();
        let from = "/";
        // if previous path exists, sends User over to saved location after signing in
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,

        }

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                console.log('User is authenticated', user)
                navigate(from);
            } else {
                console.log('the user is ' + user);
                setErrors(["Sign-in was unsuccessful"])
            }
        } catch (error) {
            console.log(error);
        }

    }

    // returns a list of errors in JSX if validation fails

    const errorKey = (errorArray) => {
        console.log(errorArray);
        const errorList = []
        for (let i = 0; i < errorArray.length; i++) {
            console.log(errorArray[i]);
            errorList.push(<li key={i}> {errorArray[i]} </li>)
        }
        return errorList
    }

    // sends user to courses home if 'cancel' is clicked
    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="form--centered">
            <h2>Sign In</h2>

            {errors.length ? (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>{errorKey(errors)}</ul>
                </div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    ref={emailAddress}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    ref={password}
                />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">Sign up</Link>!</p>

        </div>
    )
};

export default UserSignIn;