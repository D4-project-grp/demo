import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";
import "./MyListings.css";

export default function MyListings() {
  const { venues, deleteVenue } = useApp();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteVenue(id);
    setDeleteConfirm(null);
  };

  const packageLabel = (pkg) => {
    if (pkg === "monthly") return "Monthly Plan";
    if (pkg === "yearly") return "Yearly Plan";
    return pkg;
  };

  const statusBadge = (status) => {
    if (status === "active") return { label: "Active", cls: "badge-active" };
    if (status === "pending_approval") return { label: "Pending Approval", cls: "badge-pending" };
    return { label: status, cls: "badge-default" };
  };

  return (
    <div className="my-listings">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">My Listings</h1>
          <p className="page-subtitle">Manage all your venue listings</p>
        </div>
        <button
          className="btn-add-venue"
          onClick={() => navigate("/add-venue")}
        >
          + Add New Venue
        </button>
      </div>

      {venues.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏢</span>
          <h3>No venues listed yet</h3>
          <p>Start by adding your first venue to attract customers.</p>
          <button
            className="btn-add-venue"
            onClick={() => navigate("/add-venue")}
          >
            + Add Your First Venue
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {venues.map((venue) => {
            const { label, cls } = statusBadge(venue.status);
            return (
              <div key={venue.id} className="venue-card">
                <div className="venue-card-image">
                  {venue.images && venue.images.length > 0 ? (
                    <img src={venue.images[0]} alt={venue.name} />
                  ) : (
                    <div className="venue-image-placeholder">
                      <span>🏛️</span>
                      <p>{venue.name} Photo</p>
                    </div>
                  )}
                  <span className={`venue-status-badge ${cls}`}>{label}</span>
                </div>

                <div className="venue-card-body">
                  <h3 className="venue-name">{venue.name}</h3>

                  <div className="venue-meta">
                    <div className="venue-meta-item">
                      <span className="meta-icon">👥</span>
                      <span>Capacity: {venue.guests} guests</span>
                    </div>
                    <div className="venue-meta-item">
                      <span className="meta-icon">💰</span>
                      <span>₹{venue.price.toLocaleString()} / day</span>
                    </div>
                    <div className="venue-meta-item">
                      <span className="meta-icon">📍</span>
                      <span>{venue.city}</span>
                    </div>
                    <div className="venue-meta-item">
                      <span className="meta-icon">📦</span>
                      <span>{packageLabel(venue.package)}</span>
                    </div>
                  </div>

                  {venue.amenities && venue.amenities.length > 0 && (
                    <div className="venue-amenities">
                      {venue.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="amenity-tag">{a}</span>
                      ))}
                      {venue.amenities.length > 4 && (
                        <span className="amenity-tag amenity-more">
                          +{venue.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="venue-card-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/edit-venue/${venue.id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-bookings"
                      onClick={() => navigate("/current-bookings")}
                    >
                      📅 Bookings
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setDeleteConfirm(venue.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Venue?</h3>
            <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn-cancel-modal"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-delete"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
