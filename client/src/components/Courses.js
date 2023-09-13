import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Routes, Route } from "react-router-dom";
import CourseDetail from "./CourseDetail";

/** retrieves list of courses from /api/courses and renders it
 * renders course w/ link to their "Course Detail"
 * renders a link to the "Create Course" screen
 */

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/courses")
            .then(response => {
                // handle success
                setCourses(response.data);
            })
            .catch(error => {
                // handle error
                console.log("Error fetching and parsing data", error);
            })
    }, []);

    return (
        <div className="wrap main--grid">
        {courses.map((course) => {
          return (
          <NavLink className="course--module course--link" to={`${course.id}`} key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title" >{course.title}</h3>
          </NavLink>
          )
        })}
        {/* <Routes>
            <Route path={`${course.id}`} element={<CourseDetail />} />
        </Routes> */}
        </div>
    )

}

export default Courses; 