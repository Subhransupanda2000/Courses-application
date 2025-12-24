import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => setCourse(res.data));
  }, [id]);

  if (!course) return <p className="loading">Loading...</p>;

  return (
    <div className="course-details">
      {/* Hero Section */}
      <div className="course-hero">
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        <div className="meta">
          <span>⏱ {course.duration} 3 hrs</span>
          <span>🎯 Beginner to Advanced</span>
          <span>⭐ 4.8 (2.1k reviews)</span>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate(`/course/${id}/book`)}
        >
          Book 1:1 Session
        </button>
      </div>

      {/* Content */}
      {/* <div className="course-content">
        <section>
          <h2>What you’ll learn</h2>
          <ul>
            {course.outcomes?.map((o, i) => (
              <li key={i}>✔ {o}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Course Curriculum</h2>
          {course.modules?.map((m, i) => (
            <div key={i} className="module">
              <h4>{m.title}</h4>
              <p>{m.sessions} Sessions</p>
            </div>
          ))}
        </section>
      </div> */}
    </div>
  );
}
