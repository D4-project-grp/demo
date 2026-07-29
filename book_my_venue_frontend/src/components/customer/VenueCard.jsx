import { useNavigate } from "react-router";
import { db } from "../../data/mockData";
import "./VenueCard.css";

export default function VenueCard({ venue }) {
  const navigate = useNavigate();
  const reviews = db.getReviewsForVenue(venue.venue_id);
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="venue-card" onClick={() => navigate(`/venue/${venue.venue_id}`)}>
      <div className="venue-card-img">
        <img src={venue.images[0]} alt={venue.venue_name} loading="lazy" />
        {avgRating && (
          <span className="venue-card-rating">
            ★ {avgRating}
          </span>
        )}
      </div>
      <div className="venue-card-body">
        <h3>{venue.venue_name}</h3>
        <p className="venue-card-loc">{venue.locality}, {venue.city}</p>
        <div className="venue-card-meta">
          <span>👥 Up to {venue.guest_capacity} guests</span>
        </div>
        <div className="venue-card-footer">
          <span className="venue-card-price">₹{venue.price.toLocaleString("en-IN")}<small>/day</small></span>
          <button
            className="venue-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/venue/${venue.venue_id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
