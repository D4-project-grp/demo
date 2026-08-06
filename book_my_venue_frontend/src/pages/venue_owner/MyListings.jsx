import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {getAllVenues } from "../../api/venueService"
import "./MyListings.css";

export default function MyListings() {
  // const { venues, deleteVenue } = useApp();
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  useEffect(()=>{
    
    async function fetchData() {
      const response=await getAllVenues();
      
     
      setVenues(  response.data)
      

    }
    fetchData()
    
  },[])
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
          onClick={() => navigate("/owner/add-venue")}
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
            onClick={() => navigate("/owner/add-venue")}
          >
            + Add Your First Venue
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {venues.map((venue,key) => {
            const { label, cls } = statusBadge(venue.status);
            return (
              <div key={venue.venueId} className="venue-card">
                <div className="venue-card-image">
                  {venue.img_url ? (
                    <img src={venue.img_url} alt={venue.name} />
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
                      <span>Capacity: {venue.guestCapacity} guests</span>
                    </div>
                    <div className="venue-meta-item">
                      <span className="meta-icon">💰</span>
                      <span>₹{venue.price.toLocaleString()} / day</span>
                    </div>
                    <div className="venue-meta-item">
                      <span className="meta-icon">📍</span>
                      <span>{venue.city}</span>
                    </div>
                     
                  </div>

                  

                  <div className="venue-card-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/edit-venue/${venue.venudId}`)}
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
