import React, { useEffect, useState } from "react";
import axios from "axios"

function App() {
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
  }, [])


  return (
    <div id="root">
      <main>
      <div className="wrap main--grid">
        {courses.map((course) => {
          return (
          <a className="course--module course--link" href="course-detail.html">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title" key={course.id}>{course.title}</h3>
          </a>
          )
        })}
        </div>
      </main>

    </div>
  );
}

export default App;
