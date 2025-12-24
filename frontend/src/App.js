import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourses";
import "./App.css";
import BookSession from "./pages/BookingSession";
import CourseDetails from "./pages/CourseDetails";

export default function App() {
  return (
    <BrowserRouter>
      {/* Top Navbar */}
      <header className="navbar">
        <div className="logo">eKalakaar</div>

        <nav className="nav-links">
          <NavLink to="/" end>
            Courses
          </NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/create">Create Course</NavLink>
        </nav>
      </header>

      {/* Page Content */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/course/:id/book" element={<BookSession />} />
          <Route path="/course/:id" element={<CourseDetails />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} eKalakaar · Learn · Create · Grow
      </footer>
    </BrowserRouter>
  );
}
