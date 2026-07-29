import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../data/mockData";
import StarRating from "./StarRating";
import "./ReviewSection.css";

export default function ReviewSection({ venueId }) {
  // const { currentUser } = useAuth();
  const [reviews, setReviews] = useState(() => db.getReviewsForVenue(venueId));
  const [sortBy, setSortBy] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);

  const sorted = useMemo(() => {
    const copy = [...reviews];
    copy.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );
    return copy;
  }, [reviews, sortBy]);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    const newReview = db.addReview({
      venue_id: Number(venueId),
      booking_id: null,
      user_name: `${currentUser.firstname} ${currentUser.lastname || ""}`.trim(),
      note,
      rating,
      photos: photoPreview ? [photoPreview] : [],
    });
    setReviews((r) => [newReview, ...r]);
    setShowForm(false);
    setNote("");
    setRating(5);
    setPhotoPreview(null);
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <div>
          <h2>Ratings &amp; Reviews</h2>
          <div className="review-summary">
            <span className="review-avg">★ {avg}</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
        </div>
        <div className="review-actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          {/*currentUser*/ "sushant" && (
            <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
              {showForm ? "Cancel" : "Write a review"}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={submitReview}>
          <label>Your rating</label>
          <StarRating value={rating} onChange={setRating} size={24} />
          <label>Your review</label>
          <textarea
            rows={3}
            placeholder="Share your experience about this venue..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
          <label>Add a photo (optional)</label>
          <input type="file"  accept="image/*" onChange={handlePhoto} />
          {photoPreview && <img className="review-photo-preview" src={photoPreview} alt="preview" />}
          <button type="submit" className="btn-primary">Submit review</button>
        </form>
      )}

      <div className="review-list">
        {sorted.length === 0 && <p className="no-reviews">No reviews yet. Be the first to review!</p>}
        {sorted.map((r) => (
          <div key={r.review_id} className="review-item">
            <div className="review-item-top">
              <div className="review-avatar">{r.user_name?.[0]?.toUpperCase() || "U"}</div>
              <div>
                <div className="review-name">{r.user_name}</div>
                <div className="review-date">{new Date(r.created_at).toLocaleDateString()}</div>
              </div>
              <StarRating value={r.rating} readOnly size={14} />
            </div>
            <p className="review-note">{r.note}</p>
            {r.photos && r.photos.length > 0 && (
              <div className="review-photos">
                {r.photos.map((p, i) => (
                  <img key={i} src={p} alt="review" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
