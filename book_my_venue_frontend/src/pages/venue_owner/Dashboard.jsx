import React from "react";
import { useNavigate } from "react-router";
// import { useApp } from "../../context/AppContext";
import "./Dashboard.css";

export default function Dashboard() {
  // const { currentBookings, oldBookings } = useApp();
  const navigate = useNavigate();

//   const totalRevenue = [...currentBookings, ...oldBookings].reduce(
//     (sum, b) => sum + b.cost,
//     0
//   );

//   const recentBookings = currentBookings.slice(0, 5);
//
  const statusColor = (status) => {
    if (status === "Confirmed") return "badge-confirmed";
    if (status === "Pending") return "badge-pending";
    if (status === "Completed") return "badge-completed";
    return "badge-default";
  };

  return (
   
    <div className="dashboard">
     
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's an overview of your venue business.</p>
      </div>

{/*        */}{/* Stats Cards */}
{/*       <div className="stats-grid"> */}
{/*         <div className="stat-card stat-blue"> */}
{/*           <div className="stat-icon">🏢</div> */}
{/*           <div className="stat-info"> */}
{/*             <div className="stat-value">{venues.length}</div> */}
{/*             <div className="stat-label">Total Venues</div> */}
{/*           </div> */}
{/*         </div> */}
{/*         <div className="stat-card stat-orange"> */}
{/*           <div className="stat-icon">📅</div> */}
{/*           <div className="stat-info"> */}
{/*             <div className="stat-value">{currentBookings.length}</div> */}
{/*             <div className="stat-label">Current Bookings</div> */}
{/*           </div> */}
{/*         </div> */}
{/*         <div className="stat-card stat-green"> */}
{/*           <div className="stat-icon">📋</div> */}
{/*           <div className="stat-info"> */}
{/*             <div className="stat-value">{currentBookings.length + oldBookings.length}</div> */}
{/*             <div className="stat-label">Total Bookings</div> */}
{/*           </div> */}
{/*         </div> */}
{/*         <div className="stat-card stat-purple"> */}
{/*           <div className="stat-icon">💰</div> */}
{/*           <div className="stat-info"> */}
{/*             <div className="stat-value">₹{(totalRevenue / 1000).toFixed(0)}K</div> */}
{/*             <div className="stat-label">Revenue</div> */}
{/*           </div> */}
{/*         </div> */}
{/*       </div> */}

      {/* Recent Bookings */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Recent Bookings</h2>
          <button
            className="btn-view-all"
            onClick={() => navigate("/current-bookings")}
          >
            View All Bookings
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-row">No bookings yet</td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="booking-id">{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.venue}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.guests}</td>
                    <td>₹{booking.cost.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${statusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button
          className="btn-primary"
          onClick={() => navigate("/owner/add-venue")}
        >
          + Add New Venue
        </button>
        <button
          className="btn-secondary"
          onClick={() => navigate("/owner/current-bookings")}
        >
          View All Bookings
        </button>
        <button
          className="btn-secondary"
          onClick={() => navigate("/owner/my-listings")}
        >
          My Listings
        </button>
      </div>
    </div>
  );
}
