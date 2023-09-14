import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";

/**
 * retrives detail from course "api/courses:id" + renders course
 * renders "Delete Course" button that sends a delete request to "api/courses/:id"
 * renders "Update Course" button for nav to "Update Course" screen
 */

const CourseDetail = () => {
    const courseId = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(response => {
                setCourse(response.data)
                // handle success
            })
            .catch(error => {
                // handle error
                console.log("Error fetching and parsing data in Course Detail", error);
            })
    }, [courseId]);

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name" key={course.id}>name</h4>
                            <p>by {course.id}</p>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.map((thisCourse) => {
                                    return (
                                        <li>{thisCourse.materialsNeeded}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

};

export default CourseDetail;