import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

import FoodMenuSelector from "../../components/customer/FoodMenuSelector";
import { getVenueDetailsByVenueId, getAllMenusByVenueId } from "../../api/venueService";
import "../customer/BookingPage.css";

const EVENT_TYPES = ["Wedding", "Birthday", "Engagement", "Corporate", "Anniversary", "Baby Shower", "Other"];
const STEPS = ["Event Details", "Select Food Menu", "Review & Confirm"];

// "MAIN_COURSE_NON_VEGETARIAN" -> "Main Course Non Vegetarian"
const formatMenuTypeLabel = (menuType) =>
  menuType
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function BookingPage() {
  const { venueId } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState("Wedding");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedFood, setSelectedFood] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const venueResponse = await getVenueDetailsByVenueId(venueId);
        const menuResponse = await getAllMenusByVenueId(venueId);
        setVenue(venueResponse.data);
        setMenu(menuResponse.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [venueId]);

  // API returns menu grouped by menuType, each item has no id and a single
  // imgUrl string (not an images array). Normalize both here, once, so every
  // child component (FoodMenuSelector, FoodItemGallery, the review list)
  // can rely on a consistent shape: food_id, food_name, food_type, images[].
  const groupedMenu = useMemo(() => {
    if (!menu) return [];
    return menu
      .filter((group) => group.items.length > 0)
      .map((group) => ({
        key: group.menuType,
        label: formatMenuTypeLabel(group.menuType),
        items: group.items.map((item, idx) => ({
          food_id: `${group.menuType}_${idx}`,
          menu_type: group.menuType,
          food_name: item.foodName,
          food_type: item.foodType,
          price: item.price,
          description: item.description,
          images: item.imgUrl ? [item.imgUrl] : [],
        })),
      }));
  }, [menu]);

  const allFoodItems = useMemo(
    () => groupedMenu.flatMap((group) => group.items),
    [groupedMenu]
  );

  const guestCount = Number(guests || 0);

  const selectedFoodDetails = useMemo(
    () => allFoodItems.filter((f) => selectedFood.includes(f.food_id)),
    [allFoodItems, selectedFood]
  );
  const foodCost = selectedFoodDetails.reduce((sum, f) => sum + f.price * (guestCount || 1), 0);
  const totalCost = (venue && venue.price ? venue.price : 0) + foodCost;

  if (loading) {
    return (
      <div className="empty-state">
        <h3>Loading venue...</h3>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="empty-state">
        <h3>Venue not found</h3>
      </div>
    );
  }

  const toggleFood = (foodId) => {
    setSelectedFood((prev) =>
      prev.includes(foodId) ? prev.filter((fid) => fid !== foodId) : [...prev, foodId]
    );
  };

  const validateStep1 = () => {
    if (!startDate || !endDate) return "Please select both start and end date.";
    if (new Date(endDate) < new Date(startDate)) return "End date cannot be before start date.";
    if (!guests || guestCount < 1) return "Please enter a valid number of guests.";
    if (guestCount > venue.guestCapacity) return "This venue supports a maximum of " + venue.guestCapacity + " guests.";
    return "";
  };

  const goNext = () => {
    setError("");
    if (step === 0) {
      const err = validateStep1();
      if (err) {
        toast.error(err);
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
    //   venue_id: venue.venueId,
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
      <h1>Book {venue.venueName}</h1>
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

              <label>Number of guests (max {venue.guestCapacity})</label>
              <input type="number" min="1" max={venue.guestCapacity} value={guests} onChange={(e) => setGuests(e.target.value)} required />
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
                        <div className="food-type">{formatMenuTypeLabel(f.menu_type)}</div>
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
          <img src={venue.venue_images?.[0]} alt={venue.venueName} className="summary-img" />
          <h3>{venue.venueName}</h3>
          <p className="summary-loc">{venue.address.locality}, {venue.address.city}</p>
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
