import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";


/** retrieves list of courses from /api/courses and renders it
 * renders course w/ link to their "Course Detail"
 * renders a link to the "Create Course" screen
 */

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:5000/api/courses")
                .then(response => {
                    // handle success
                    setCourses(response.data);
                })
                .catch(error => {
                    // handle error
                    console.log("Error fetching and parsing data", error);
                })
        }
        
        fetchData();
    }, []);

    return (
        <div className="wrap main--grid">
            {courses.map((course) => {
                return (
                    <NavLink className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title" >{course.title}</h3>
                    </NavLink>
                )
            })}
            <Link className="course--module course--add--module" to="/courses/create" >
                    <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>

        </div>
    )

}

export default Courses; 