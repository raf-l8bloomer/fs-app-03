import React from "react";
import { Route, Routes, } from "react-router-dom"

import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";

import NotFound from "./components/error-handling/NotFound";
import Forbidden from "./components/error-handling/Forbidden";
import UnhandledError from "./components/error-handling/UnhandledError";

function App() {

  return (
    <div id="root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
