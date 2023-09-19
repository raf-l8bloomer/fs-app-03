/**
 * renders form for user to update existing course
 * renders "Update Course" button that sends PUT request to /api/courses/:id
 * renders "Cancel" button that returns to "Course Detail" 
 */
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
    // Pulls Authenticated User from UserContext
    const { authUser } = useContext(UserContext);
    // setting up navigate for routing
    const navigate = useNavigate();
    // Pulls course information by course id
    const courseId = useParams();

    // course and errors states
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    // course detail states 
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    useEffect(() => {
        async function fetchData() {

            // Fetches the specific course by id and sets it to course state
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${courseId.id}`)
                const fetchedCourse = response.data
                // if Authorized User doesn't match the Course Owner, sends user to Forbidden page
                if (response.data.courseOwner.id !== authUser.userId) {
                    navigate("/forbidden");
                } else {
                    setCourse(response);
                    setCourseTitle(fetchedCourse.title);
                    setCourseDescription(fetchedCourse.description);
                    setEstimatedTime(fetchedCourse.estimatedTime);
                    setMaterialsNeeded(fetchedCourse.materialsNeeded);
                }
            } catch (error) {
                console.log("Error fetching and parsing data in Course Detail", error);
                navigate("/notfound")
            }
        }
        fetchData();
    }, [courseId, navigate, authUser]);


    // sets edited input fields to the current course upon submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
        }

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        // sends a Put request while checking if Authorized User is = to the Course Owner
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(course)
        }

        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseId.id}`, fetchOptions);
            if (response.status === 204) {
                console.log("course updated!")
                navigate(`/courses/${courseId.id}`);
            } else if (response.status === 400) {
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
            <h2>Update Course</h2>
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
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                        />

                        <p>By {authUser.firstName} {authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={materialsNeeded}
                            onChange={(e) => setMaterialsNeeded(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse;