import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => alert("Failed to load courses"))
      .finally(() => setLoading(false));
  }, []);

  // 🔍 Search + Sort logic
  const filteredCourses = useMemo(() => {
    let data = [...courses];

    // Search
    if (search) {
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          (c.description || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === "az") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }

    return data;
  }, [courses, search, sort]);

  if (loading) return <p className="loading">Loading courses...</p>;

  return (
    <div className="courses-container">
      <h2 className="courses-title">📚 Available Courses</h2>

      {/* Controls */}
      <div className="courses-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="az">Title (A–Z)</option>
          <option value="za">Title (Z–A)</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="courses-grid">
        {filteredCourses.length === 0 ? (
          <p className="empty">No courses found</p>
        ) : (
          filteredCourses.map((c) => (
            <div className="course-card" key={c.GSI1SK || c.id}>
              {console.log("IMAGE URL FROM API 👉", c)}

              {/* 🔥 Course Image */}
              <img
                src={`https://ekalakaar-node-bucket-123.s3.us-east-1.amazonaws.com/${c.imageKey}`}
                alt={c.title}
                className="course-image"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />

              <h3>{c.title}</h3>
              <p>{c.description}</p>

              <button onClick={() => navigate(`/course/${c.id}`)}>
                View Course
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
