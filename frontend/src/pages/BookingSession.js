import { useState } from "react";
import "./BookingSession.css";

export default function BookSession() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [success, setSuccess] = useState(false);

  const slots = ["10:00 AM", "12:00 PM", "4:00 PM", "7:00 PM"];

  const handleSubmit = () => {
    // later you can call API here
    setSuccess(true);
  };

  const closePopup = () => {
    setSuccess(false);
    setDate("");
    setSlot("");
  };

  return (
    <div className="booking-wrapper">
      {/* Hero */}
      <div className="booking-hero">
        <h1>Book Your 1:1 Live Session</h1>
        <p>Choose a date and time that works best for you</p>
      </div>

      {/* Card */}
      <div className="booking-card">
        {/* Date */}
        <div className="section">
          <label>Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Slots */}
        <div className="section">
          <label>Select Time Slot</label>
          <div className="slots">
            {slots.map((s) => (
              <button
                key={s}
                className={`slot ${slot === s ? "active" : ""}`}
                onClick={() => setSlot(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          className="confirm-btn"
          disabled={!date || !slot}
          onClick={handleSubmit}
        >
          Confirm Booking
        </button>

        <p className="note">
          🔒 You will receive session details on your email
        </p>
      </div>

      {/* ✅ Success Popup */}
      {success && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Booking Confirmed!</h2>
            <p>
              Your session is booked on <b>{date}</b> at <b>{slot}</b>.
            </p>
            <button className="close-btn" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
