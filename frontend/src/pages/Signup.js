import { useState } from "react";
import api from "../api/axios";
import "./Auth.css";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await api.post("/auth/signup", { email, password, role });
      setMsg("Account created successfully 🎉 Please login.");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (err) {
      setMsg("Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join eKalakaar and start learning today</p>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>

        {msg && <p className="auth-message">{msg}</p>}
      </div>
    </div>
  );
}
