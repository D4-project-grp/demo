import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../../data/mockData";
 
import FoodMenuSelector from "../../components/customer/FoodMenuSelector";
import "../customer/BookingPage.css";

const EVENT_TYPES = ["Wedding", "Birthday", "Engagement", "Corporate", "Anniversary", "Baby Shower", "Other"];
const STEPS = ["Event Details", "Select Food Menu", "Review & Confirm"];

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const currentUser  =  
  const venue = db.getVenue(id);
  const groupedMenu = venue ? db.getFoodItemsGroupedByMenuType(venue.venue_id) : [];
  const allFoodItems = venue ? db.getFoodItemsForVenue(venue.venue_id) : [];

  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState("Wedding");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedFood, setSelectedFood] = useState([]);
  const [error, setError] = useState("");

  const guestCount = Number(guests || 0);

  const selectedFoodDetails = useMemo(
    () => allFoodItems.filter((f) => selectedFood.includes(f.food_id)),
    [allFoodItems, selectedFood]
  );
  const foodCost = selectedFoodDetails.reduce((sum, f) => sum + f.price * (guestCount || 1), 0);
  const totalCost = (venue && venue.price ? venue.price : 0) + foodCost;

  if (!venue) {
    return (
      <div className="empty-state">
        <h3>Venue not found</h3>
      </div>
    );
  }

  const toggleFood = (foodId) => {
    setSelectedFood((prev) =>
      prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );
  };

  const validateStep1 = () => {
    if (!startDate || !endDate) return "Please select both start and end date.";
    if (new Date(endDate) < new Date(startDate)) return "End date cannot be before start date.";
    if (!guests || guestCount < 1) return "Please enter a valid number of guests.";
    if (guestCount > venue.guest_capacity) return "This venue supports a maximum of " + venue.guest_capacity + " guests.";
    return "";
  };

  const goNext = () => {
    setError("");
    if (step === 0) {
      const err = validateStep1();
      if (err) {
        setError(err);
        return;
      }
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = () => {
    // const booking = db.createBooking({
    //   user_id: currentUser.user_id,
    //   venue_id: venue.venue_id,
    //   event_type: eventType,
    //   start_date: startDate,
    //   end_date: endDate,
    //   no_of_guests: guestCount,
    //   food_items: selectedFood,
    //   cost: totalCost,
    // });
    navigate("/payment/" + 10);
  };

  return (
    <div className="container booking-page">
      <h1>Book {venue.venue_name}</h1>
      <p className="booking-subtitle">Fill in your event details, choose your food menu, then confirm.</p>

      <div className="booking-stepper">
        {STEPS.map((label, i) => (
          <div key={label} className={"booking-step" + (i === step ? " active" : "") + (i < step ? " done" : "")}>
            <span className="booking-step-num">{i < step ? "✓" : i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      <div className="booking-layout">
        <div className="booking-form">
          {error && <div className="form-error">{error}</div>}

          {step === 0 && (
            <div>
              <label>Event type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <div className="booking-row">
                <div>
                  <label>Start date</label>
                  <input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div>
                  <label>End date</label>
                  <input type="date" value={endDate} min={startDate || new Date().toISOString().split("T")[0]} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
              </div>

              <label>Number of guests (max {venue.guest_capacity})</label>
              <input type="number" min="1" max={venue.guest_capacity} value={guests} onChange={(e) => setGuests(e.target.value)} required />
            </div>
          )}

          {step === 1 && (
            <div>
              
              <FoodMenuSelector
                groupedMenu={groupedMenu}
                selectedIds={selectedFood}
                onToggle={toggleFood}
                guests={guestCount}
              />
            </div>
          )}

          {step === 2 && (
            <div className="booking-review">
              <h3>Event Details</h3>
              <div className="review-grid">
                <div><span>Event type</span><strong>{eventType}</strong></div>
                <div><span>Dates</span><strong>{startDate} to {endDate}</strong></div>
                <div><span>Guests</span><strong>{guestCount}</strong></div>
              </div>

              <h3>Selected Food Items ({selectedFoodDetails.length})</h3>
              {selectedFoodDetails.length === 0 ? (
                <p className="no-reviews">No food items selected. You can go back and add some, or skip and book the venue only.</p>
              ) : (
                <div className="review-food-list">
                  {selectedFoodDetails.map((f) => (
                    <div key={f.food_id} className="review-food-item">
                      <img src={f.images[0]} alt={f.food_name} />
                      <div className="review-food-info">
                        <div className="food-name">
                          <span className={"veg-dot " + (f.food_type === "VEG" ? "veg" : "nonveg")} />
                          {f.food_name}
                        </div>
                        <div className="food-type">{f.menu_type.replace(/_/g, " ")}</div>
                      </div>
                      <div className="review-food-price">₹{(f.price * guestCount).toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="booking-nav">
            {step > 0 && (
              <button type="button" className="btn-primary" onClick={goBack}>Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className="btn-primary" onClick={goNext}>Continue</button>
            ) : (
              <button type="button" className="btn-primary" onClick={handleConfirm}>Continue to Payment</button>
            )}
          </div>
        </div>

        <aside className="booking-summary">
          <img src={venue.images[0]} alt={venue.venue_name} className="summary-img" />
          <h3>{venue.venue_name}</h3>
          <p className="summary-loc">{venue.locality}, {venue.city}</p>
          <div className="summary-row">
            <span>Venue price</span>
            <span>₹{venue.price.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Food ({selectedFoodDetails.length} items)</span>
            <span>₹{foodCost.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalCost.toLocaleString("en-IN")}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
