/**
 * renders form to sign up w/ new account
 * renders "Sign Up" button that sends a POST request to API's /api/users 
 * and signs in user
 * renders "Cancel" button that returns user to list of courses
 */

import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

const UserSignUp = () => {
    // imports Sign In function from User Context
    const { actions } = useContext(UserContext);
    // setting up navigate for routing
    const navigate = useNavigate();

    // user states
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const [errors, setErrors] = useState([]);

    // submits inputted user info for sign up
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        // sends Post request to add user into User database
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        }

        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);
            if (response.status === 201) {
                console.log(`${user.emailAddress} is successfully signed up and authenticated!`)
                // sign in user immmediately after signing up
                await actions.signIn(user);
                navigate('/');
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/")
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
        navigate("/")
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>

            {errors.length ? (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>{errorKey(errors)}</ul>
                </div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    ref={firstName} />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    ref={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    ref={password} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary"
                    onClick={handleCancel}
                >Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    )
};

export default UserSignUp;