import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
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
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name" key={course.id}> {course.title}</h4>
                            <p>by {course.id}</p>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.map((thisCourse) => {
                                    <li>{thisCourse.materialsNeeded}</li>
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