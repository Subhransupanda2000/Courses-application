import { useState } from "react";
import api from "../api/axios";
import "./Auth.css";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!image) {
      setMsg("Please select a course image ❌");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      await api.post("/courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("Course created successfully 🎉");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      setMsg("Failed to create course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create New Course</h2>
        <p className="auth-subtitle">
          Admin panel · Publish a new learning experience
        </p>

        <form onSubmit={handleCreate} className="auth-form">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              placeholder="Java Backend Mastery"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Spring Boot, AWS, Microservices"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button className="auth-btn" disabled={loading}>
            {loading ? "Uploading..." : "Create Course"}
          </button>
        </form>

        {msg && <p className="auth-message">{msg}</p>}
      </div>
    </div>
  );
}
