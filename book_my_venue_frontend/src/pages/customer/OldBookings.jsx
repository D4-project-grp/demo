import { useAuth } from "../context/AuthContext";
import { db } from "../data/mockData";
import BookingsList from "../components/BookingsList";

export default function OldBookings() {
  const { currentUser } = useAuth();
  const all = db.getBookingsForUser(currentUser.user_id);
  const today = new Date().toISOString().split("T")[0];

  const old = all.filter(
    (b) => b.status === "CANCELLED" || (b.end_date && b.end_date < today)
  );

  return (
    <div>
      <h1>Booking History</h1>
      <p className="profile-subtitle">Your past and cancelled bookings.</p>
      <BookingsList
        bookings={old}
        emptyTitle="No past bookings"
        emptyText="Your completed bookings will show up here."
      />
    </div>
  );
}
