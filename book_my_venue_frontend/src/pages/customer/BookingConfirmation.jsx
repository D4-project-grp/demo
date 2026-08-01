import { useParams, useNavigate, Link } from "react-router";
import { db ,dummyBookings} from "../../data/mockData";
import "./BookingConfirmation.css";

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const booking =dummyBookings[0];

  // if (!booking) {
  //   return (
  //     <div className="empty-state">
  //       <h3>Booking not found</h3>
  //     </div>
  //   );
  // }
  const venue = db.getVenue(11);
  // const foodItems = (booking.food_items || [])
  //   .map((id) => db.getFoodItem(id))
  //   .filter(Boolean);

  return (
    <div className="container confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your venue has been successfully booked. A confirmation has been sent to your registered email.</p>

        <div className="confirmation-details">
          <div className="cd-row"><span>Booking ID</span><span>#{booking.booking_id}</span></div>
          <div className="cd-row"><span>Venue</span><span>{venue?.venue_name}</span></div>
          <div className="cd-row"><span>Event type</span><span>{booking.event_type}</span></div>
          <div className="cd-row"><span>Dates</span><span>{booking.start_date} → {booking.end_date}</span></div>
          <div className="cd-row"><span>Guests</span><span>{booking.no_of_guests}</span></div>
          {/* {foodItems.length > 0 && (
            <div className="cd-row"><span>Food items</span><span>{foodItems.map((f) => f.food_name).join(", ")}</span></div>
          )} */}
          <div className="cd-row total"><span>Amount paid</span><span>₹{ 11000}</span></div>
        </div>

        <div className="confirmation-actions">
          <button className="btn-primary" onClick={() => navigate("/customer/bookings/current")}>View My Bookings</button>
          <Link to="/venues" className="btn-primary">Explore More Venues</Link>
        </div>
      </div>
    </div>
  );
}
