/**
 * renders a form for sign in 
 * renders "Sign In" button that signs in user
 * renders "Cancel" button that returns user to list of courses
 */

import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                console.log('User is authenticated', user)
                navigate('/');
            } else {
                console.log('the user is ' + user);
                setErrors(["Sign-in was unsuccessful"])
            }
        } catch (error) {
            console.log(error);
        }

    }

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
                    <ul>
                        <li>{errors}</li>
                    </ul>
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