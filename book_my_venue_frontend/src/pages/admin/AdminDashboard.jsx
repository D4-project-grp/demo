import React, { useState } from 'react';
 
import { KPICard } from '../../components/KPICard';
 
 
import {
  mockKPIs,
  mockUserBreakdown,
  mockVenueStatus,
  mockRecentBookings,
} from '../../lib/mockData';
import './AdminDashboard.css';

export default function AdminDashboard() {
   

  return (
     
     
        <div className="dashboard-container">
          {/* KPI Cards Section */}
          <section className="kpi-section">
            <h2 className="section-title">Platform Overview</h2>
            <div className="kpi-grid">
              <KPICard
                title="Total Users"
                value={mockKPIs.totalUsers}
                icon="👥"
                trend={{ direction: 'up', percentage: 12 }}
              />
              <KPICard
                title="Total Venues"
                value={mockKPIs.totalVenues}
                icon="🏢"
                trend={{ direction: 'up', percentage: 8 }}
              />
              <KPICard
                title="Total Bookings"
                value={mockKPIs.totalBookings}
                icon="📅"
                trend={{ direction: 'up', percentage: 15 }}
              />
              <KPICard
                title="Revenue"
                value={mockKPIs.revenue}
                icon="💰"
                trend={{ direction: 'up', percentage: 20 }}
              />
            </div>
          </section>

          {/* Analytics Section */}
          <section className="analytics-section">
            <div className="analytics-grid">
              {/* User Breakdown */}
              <div className="analytics-card">
                <h3 className="card-title">User Breakdown</h3>
                <div className="breakdown-list">
                  {mockUserBreakdown.map((item, index) => (
                    <div key={index} className="breakdown-item">
                      <span className="breakdown-label">{item.type}</span>
                      <span className="breakdown-value">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Status */}
              <div className="analytics-card">
                <h3 className="card-title">Venue Status</h3>
                <div className="status-list">
                  {mockVenueStatus.map((item, index) => (
                    <div key={index} className="status-item">
                      <span className="status-label">{item.status}</span>
                      <div className="status-bar">
                        <div
                          className={`status-fill ${item.status.toLowerCase()}`}
                          style={{
                            width: `${(item.count / 300) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="status-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Recent Bookings Section */}
          <section className="bookings-section">
            <div className="section-header">
              <h2 className="section-title">Recent Bookings</h2>
              <a href="/admin/bookings" className="view-all-link">
                View All →
              </a>
            </div>

            <div className="table-responsive">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentBookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td className="booking-id">{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.venue}</td>
                      <td>
                        {new Date(booking.startDate).toLocaleDateString()}
                      </td>
                      <td className="cost">Rs. {booking.cost.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
    
     
  );
}
