/**
 * renders form for user to update existing course
 * renders "Update Course" button that sends PUT request to /api/courses/:id
 * renders "Cancel" button that returns to "Course Detail" 
 */
import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const courseId = useParams();
    const [course, setCourse] = useState(null);
    console.log(course);

    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:5000/api/courses/${courseId.id}`)
                .then(response => {
                    // handle success
                    setCourse(response.data)
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
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.textContent,
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
            const response = await fetch(`http://localhost:5000/api/courses${courseId.id}`, fetchOptions);
            if (response.status) {
                console.log("course was updated!" + courseId)
                navigate(`/courses/${course.courseId}`);
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
                            ref={courseTitle}
                        />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            ref={courseDescription}
                        ></textarea>
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
                        useRef={materialsNeeded}
                        >* 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;* Finishing Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood Filler&#13;&#13;* Minwax Oil Based Polyurethane
                        </textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse;