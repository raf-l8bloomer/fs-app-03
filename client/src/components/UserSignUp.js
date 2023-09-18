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
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    // State
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }
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
                    <ul> {errors.map((error) => {
                        return<li>{error}</li>
                    })
                    }
                    </ul>
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