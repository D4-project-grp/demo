import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useApp } from "../../context/AppContext";
import VenueForm from "../components/VenueForm";
import "./AddVenue.css";

export default function EditVenue() {
  const { id } = useParams();
  const { venues, updateVenue } = useApp();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const venue = venues.find((v) => v.id === Number(id) || v.id === id);

  if (!venue) {
    return (
      <div className="add-venue">
        <div className="page-header">
          <h1 className="page-title">Venue Not Found</h1>
          <p className="page-subtitle">The venue you're trying to edit doesn't exist.</p>
        </div>
        <button
          style={{
            padding: "10px 20px",
            background: "#1a3c6e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() => navigate("/my-listings")}
        >
          ← Back to My Listings
        </button>
      </div>
    );
  }

  const handleSubmit = (data) => {
    updateVenue(venue.id, data);
    setSubmitted(true);
    setTimeout(() => navigate("/my-listings"), 2000);
  };

  if (submitted) {
    return (
      <div className="add-venue-success">
        <div className="success-card">
          <span className="success-icon">✅</span>
          <h2>Listing Updated!</h2>
          <p>Your venue listing has been updated successfully.</p>
          <p className="redirect-note">Redirecting to My Listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-venue">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            style={{
              padding: "8px 14px",
              background: "#f1f5f9",
              color: "#475569",
              border: "1.5px solid #e2e8f0",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
            }}
            onClick={() => navigate("/my-listings")}
          >
            ← Back
          </button>
          <div>
            <h1 className="page-title">Edit Venue: {venue.name}</h1>
            <p className="page-subtitle">Update your venue listing details below.</p>
          </div>
        </div>
      </div>

      <VenueForm
        initialData={venue}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}
