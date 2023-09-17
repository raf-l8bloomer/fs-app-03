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
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const courseId = useParams();

    // const courseTitle = usevalue(null);
    // const courseDescription = usevalue(null);
    // const estimatedTime = usevalue(null);
    // const materialsNeeded = usevalue(null);
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");


    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:5000/api/courses/${courseId.id}`)
                .then(response => {
                    // handle success
                    console.log("This is the response:", response.data);
                    const data = response.data;
                    setCourse(response);
                    setCourseTitle(data.title);
                    setCourseDescription(data.description);
                    setEstimatedTime(data.estimatedTime);
                    setMaterialsNeeded(data.materialsNeeded);
                })
                .catch(error => {
                    // handle error
                    console.log("Error fetching and parsing data in Course Detail", error);
                })
        }
        fetchData();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title: courseTitle.defaultValue,
            description: courseDescription.defaultValue,
            estimatedTime: estimatedTime.defaultValue,
            materialsNeeded: materialsNeeded.defaultValue,
            userId: authUser.userId
        }

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

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
                console.log("course was updated!")
                navigate(`/courses/${courseId.id}`);
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
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            defaultValue={courseTitle}
                        />

                        <p>By {authUser.firstName} {authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            defaultValue={courseDescription}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            defaultValue={estimatedTime}
                            
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            defaultValue={materialsNeeded}

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