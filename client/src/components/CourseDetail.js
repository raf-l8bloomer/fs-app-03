import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import axios from "axios";

import UserContext from "../context/UserContext";

/**
 * retrieves detail from course "api/courses:id" + renders course
 * renders "Delete Course" button that sends a delete request to "api/courses/:id"
 * renders "Update Course" button for nav to "Update Course" screen
 */

const CourseDetail = () => {
    // Pulls Authenticated User from UserContext
    const { authUser } = useContext(UserContext);
    // setting up navigate for routing
    const navigate = useNavigate();
    // Pulls course information by course id
    const courseId = useParams();


    // State
    const [course, setCourse] = useState(null);

    // Fetches the specific course by id and sets it to course state
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${courseId.id}`);
                const fetchedCourse = response.data;
                if (!fetchedCourse) {
                    navigate("/notfound")
                } else {
                    setCourse(fetchedCourse);
                }
            } catch (error) {
                // handle error
                console.log("Error fetching and parsing data in Course Detail", error);
                navigate("/error");
            }
        }
        fetchData();
    }, [courseId, navigate]);

    // deletes course only if Authorized User matches the Course Owner

    const handleDelete = async (e) => {
        e.preventDefault();

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);


        // sends delete request to the corresponding courses id
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`
            },
        }

        try {
            await fetch(`http://localhost:5000/api/courses/${courseId.id}`, fetchOptions);
            console.log("course was deleted!")
            navigate("/")
        } catch (error) {
            console.log(error);
            navigate("/error")

        }
    }

    return (
        <>
            {course ? (
                <>
                    <div className="actions--bar">
                        <div className="wrap">
                            {(authUser && authUser.userId === course.courseOwner.id) ? (
                                <>
                                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                    <Link className="button" onClick={handleDelete}>Delete Course</Link>
                                </>
                            ) : null
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name" key={course.id}>{course.title}</h4>
                                    <p>by {course.courseOwner.firstName} {course.courseOwner.lastName}</p>
                                    <ReactMarkdown children={course.description}></ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>
                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <ReactMarkdown children={course.materialsNeeded}>
                                        </ReactMarkdown>
                                    </ul>

                                </div>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <p>course is null...</p>
            )}
        </>
    )
};

export default CourseDetail;