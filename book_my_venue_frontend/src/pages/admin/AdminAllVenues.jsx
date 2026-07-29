import React, { useState } from 'react';
 
import { mockPendingVenues, mockApprovedVenues } from '../../lib/mockData';
import './AdminAllVenues.css';

export default function AdminAllVenues() {
  const [venues, setVenues] = useState(mockPendingVenues);
  const [showApproved, setShowApproved] = useState(false);

  const handleApprove = (id) => {
    setVenues(venues.filter((v) => v.id !== id));
  };

  const handleReject = (id) => {
    setVenues(venues.filter((v) => v.id !== id));
  };

  const displayVenues = showApproved ? mockApprovedVenues : venues;

  return (
     
        <div className="venues-page">
          <div className="page-header">
            <h1 className="page-title">Venue Management</h1>
            <p className="page-subtitle">Approve or manage venue listings</p>
          </div>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${!showApproved ? 'active' : ''}`}
              onClick={() => setShowApproved(false)}
            >
              Pending Venues ({venues.length})
            </button>
            <button
              className={`toggle-btn ${showApproved ? 'active' : ''}`}
              onClick={() => setShowApproved(true)}
            >
              Approved Venues ({mockApprovedVenues.length})
            </button>
          </div>

          {!showApproved ? (
            <div className="venues-grid">
              {displayVenues.map((venue) => (
                <div key={venue.id} className="venue-card">
                  <div className="card-header">
                    <h3 className="venue-name">{venue.name}</h3>
                    <span className="venue-id">{venue.id}</span>
                  </div>

                  <div className="card-body">
                    <p className="venue-owner">
                      <strong>Owner:</strong> {venue.owner}
                    </p>
                    <p className="venue-city">
                      <strong>City:</strong> {venue.city}
                    </p>
                    <p className="venue-capacity">
                      <strong>Capacity:</strong> {venue.capacity} guests
                    </p>
                    <p className="venue-price">
                      <strong>Price/Day:</strong> Rs. {venue.pricePerDay.toLocaleString()}
                    </p>
                    <p className="venue-description">{venue.description}</p>

                    <div className="amenities">
                      <strong>Amenities:</strong>
                      <div className="amenities-list">
                        {venue.amenities.map((amenity, idx) => (
                          <span key={idx} className="amenity-tag">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn btn-approve"
                      onClick={() => handleApprove(venue.id)}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleReject(venue.id)}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="venues-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>City</th>
                    <th>Capacity</th>
                    <th>Price/Day</th>
                    <th>Bookings</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {displayVenues.map((venue) => (
                    <tr key={venue.id}>
                      <td className="venue-name">{venue.name}</td>
                      <td>{venue.owner}</td>
                      <td>{venue.city}</td>
                      <td>{venue.capacity}</td>
                      <td>Rs. {venue.pricePerDay.toLocaleString()}</td>
                      <td>{venue.bookings}</td>
                      <td>
                        <span className="rating">⭐ {venue.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      
  );
}
