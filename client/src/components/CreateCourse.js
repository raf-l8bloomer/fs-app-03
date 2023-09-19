/**
 * renders a form allows user to create a new course
 * renders "Create Course" button that sends a POST request to /api/courses
 * renders "Cancel" button that returns to list of courses
 */

import { useNavigate } from "react-router-dom"
import { useRef, useState, useContext } from "react";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
    // Pulls Authenticated User from UserContext
    const { authUser } = useContext(UserContext);
    // setting up navigate for routing
    const navigate = useNavigate();

    // setting course detail references within JSX input
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // error state
    const [errors, setErrors] = useState([]);

/**
 * creates a course using info within inputted fields
 * only if user is signed in
 * assigning course to the user
 */

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.userId
        }

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        // sends a post request to courses while adding authorization
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(course)
        }

        try {
            const response = await fetch("http://localhost:5000/api/courses", fetchOptions);
            if (response.status === 201) {
                console.log("course was made!:" + course)
                navigate("/");
            } else if (response.status === 400) {
                // if a request error, add error to our errors array
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("error");
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
        <div className="wrap">
            <h2>Create Course</h2>

            {errors.length ? (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>{errorKey(errors)}</ul>
                </div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            ref={courseTitle}
                        />

                        <p>By {authUser.firstName} {authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            ref={courseDescription}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            ref={estimatedTime}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateCourse;