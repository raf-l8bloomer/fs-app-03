/**
 * renders a form allows user to create a new course
 * renders "Create Course" button that sends a POST request to /api/courses
 * renders "Cancel" button that returns to list of courses
 */

import { useNavigate } from "react-router-dom"
import { useRef, useState, useContext} from "react";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            courseTitle: courseTitle.current.value,
            courseDescription: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(course)
        }

        try {
            const response = await fetch("http://localhost:5000/api/courses", fetchOptions);
            if (response.status === 201) {
                console.log("course was made!:" + course)
                navigate("/");
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
}


    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="wrap">
            <h2>Create Course</h2>

            { errors.length ? (
                <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div> 
            ) : null }

            <form onSubmit={authUser ? (handleSubmit) : null}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            ref={courseTitle}
                        />

                        <p>By Joe Smith</p>

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