import { useParams, useNavigate } from "react-router";
import { db } from "../../data/mockData";
import ImageSlider from "../../components/customer/ImageSlider";
import ReviewSection from "../../components/customer/ReviewSection";
import AmenityIcon from "../../components/customer/AmenityIcon";
import "./VenueDetails.css";

export default function VenueDetails() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  // const { currentUser  =  
  const venue = db.getVenue(venueId);

  if (!venue) {
    return (
      <div className="empty-state">
        <h3>Venue not found</h3>
        <button className="btn-outline" onClick={() => navigate("/venues")}>Back to venues</button>
      </div>
    );
  }

  const amenities = db.getAmenitiesForVenue(venue);
  const reviews = db.getReviewsForVenue(venue.venue_id);
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleBookNow = () => {
    // if (!currentUser) {
    //   navigate("/login", { state: { from: { pathname: `/booking/${venue.venue_id}` } } });
    //   return;
    // }
    navigate(`/booking/${venue.venue_id}`);
  };

  return (
    <div className="container venue-details">
      <ImageSlider images={venue.images} />

      <div className="venue-details-layout">
        <div className="venue-details-main">
          <div className="vd-title-row">
            <div>
              <h1>{venue.venue_name}</h1>
              <p className="vd-location">📍 {venue.street}, {venue.locality}, {venue.city} - {venue.pincode}</p>
            </div>
            {avgRating && (
              <div className="vd-rating-badge">
                <span>★ {avgRating}</span>
                <small>{reviews.length} reviews</small>
              </div>
            )}
          </div>

          <div className="vd-stats">
            <div className="vd-stat">
              <strong>{venue.guest_capacity}</strong>
              <span>Guest capacity</span>
            </div>
            <div className="vd-stat">
              <strong>₹{venue.price.toLocaleString("en-IN")}</strong>
              <span>Starting price / day</span>
            </div>
            <div className="vd-stat">
              <strong>{venue.status === "ACTIVE" ? "Available" : "Unavailable"}</strong>
              <span>Current status</span>
            </div>
          </div>

          {/* <section className="vd-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {amenities.length === 0 && <p className="no-reviews">No amenities listed.</p>}
              {amenities.map((a) => (
                <div key={a.amenity_id} className="amenity-chip">✓ {a.amenity_name}</div>
              ))}
            </div>
          </section> */}
          <section className="vd-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {amenities.length === 0 && <p className="no-reviews">No amenities listed.</p>}
              {amenities.map((a) => (
                <div key={a.amenity_id} className="amenity-chip">
                  <AmenityIcon name={a.amenity_name} />
                  {a.amenity_name}
                </div>
              ))}
            </div>
          </section>

          <section className="vd-section">
            <div className="vd-section-head">
              <h2>Food Menu</h2>
              <button className="btn-primary" onClick={handleBookNow}>Select Items &amp; Book</button>
            </div>
            {db.getFoodItemsGroupedByMenuType(venue.venue_id).map((group) => (
              group.items.length > 0 && (
                <div key={group.key} className="menu-preview-group">
                  <h4>{group.label}</h4>
                  <div className="food-grid">
                    {group.items.slice(0, 4).map((f) => (
                      <div key={f.food_id} className="food-item">
                        <img src={f.images[0]} alt={f.food_name} />
                        <div>
                          <div className="food-name">
                            <span className={`veg-dot ${f.food_type === "VEG" ? "veg" : "nonveg"}`} />
                            {f.food_name}
                          </div>
                          <div className="food-type">{f.food_type === "VEG" ? "Veg" : "Non-Veg"}</div>
                        </div>
                        {/* <div className="food-price">₹{f.price}</div> */}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </section>

          <section className="vd-section">
            <h2>Location</h2>
            <div className="map-placeholder">
              🗺️ {venue.locality}, {venue.city} — Map view
            </div>
          </section>

          <ReviewSection venueId={venue.venue_id} />
        </div>

        <aside className="vd-sidebar">
          <div className="booking-card">
            <div className="booking-price">
              ₹{venue.price.toLocaleString("en-IN")} <small>/ day</small>
            </div>
            <p className="booking-hint">Free cancellation up to 7 days before the event.</p>
            <button className="btn-primary booking-cta" onClick={handleBookNow}>
              Book This Venue
            </button>
            <p className="booking-note">You won't be charged yet.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
