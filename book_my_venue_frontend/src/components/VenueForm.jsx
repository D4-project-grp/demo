import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./VenueForm.css";

const AMENITIES_LIST = [
  { key: "Parking", icon: "🅿️" },
  { key: "AC", icon: "❄️" },
  { key: "Elevator", icon: "🛗" },
  { key: "WiFi", icon: "📶" },
  { key: "CCTV", icon: "📹" },
  { key: "Generator", icon: "⚡" },
  { key: "Catering", icon: "🍽️" },
  { key: "Stage", icon: "🎭" },
  { key: "Projector", icon: "📽️" },
  { key: "Changing Room", icon: "👔" },
];

const PACKAGES = [
  {
    key: "monthly",
    title: "Monthly",
    price: "₹999 / month",
    commission: "5% commission per booking",
    desc: "Great for getting started",
  },
  {
    key: "yearly",
    title: "Yearly",
    price: "₹6,999 / year",
    commission: "3% commission per booking",
    desc: "Best value — save more annually",
  },
];

const DEFAULT_FOOD_CATEGORIES = [
  { category: "Starters", items: "" },
  { category: "Main Course", items: "" },
  { category: "Desserts", items: "" },
  { category: "Beverages", items: "" },
];

export default function VenueForm({ initialData, onSubmit, submitLabel = "Submit Listing" }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    guests: initialData?.guests || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    street: initialData?.street || "",
    locality: initialData?.locality || "",
    city: initialData?.city || "",
    pincode: initialData?.pincode || "",
    amenities: initialData?.amenities || [],
    package: initialData?.package || "",
    images: initialData?.images || [],
    foodMenu: initialData?.foodMenu || DEFAULT_FOOD_CATEGORIES,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(initialData?.images || []);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [...imageFiles, ...files].slice(0, 6);
    setImageFiles(newFiles);
    const previews = newFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleFoodMenuChange = (index, field, value) => {
    const updated = formData.foodMenu.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({ ...prev, foodMenu: updated }));
  };

  const addFoodCategory = () => {
    setFormData((prev) => ({
      ...prev,
      foodMenu: [...prev.foodMenu, { category: "", items: "" }],
    }));
  };

  const removeFoodCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      foodMenu: prev.foodMenu.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Venue name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.guests || formData.guests <= 0) errs.guests = "Number of guests is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.price || formData.price <= 0) errs.price = "Price is required";
    if (!formData.street.trim()) errs.street = "Street is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.pincode.trim()) errs.pincode = "Pincode is required";
    if (!formData.package) errs.package = "Please select a listing package";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Switch to the tab with errors
      if (errs.name || errs.phone || errs.guests || errs.description || errs.price || errs.street || errs.city || errs.pincode) {
        setActiveTab("basic");
      } else if (errs.package) {
        setActiveTab("package");
      }
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSubmit({ ...formData, images: imagePreviews });
      setLoading(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="venue-form">
      {/* Tab navigation */}
      <div className="form-tabs">
        {[
          { key: "basic", label: "📋 Basic Info" },
          { key: "images", label: "🖼️ Images" },
          { key: "amenities", label: "✅ Amenities" },
          { key: "food", label: "🍽️ Food Menu" },
          { key: "package", label: "📦 Package" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`form-tab ${activeTab === tab.key ? "form-tab-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Basic Info Tab ─── */}
      {activeTab === "basic" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Basic Information</h3>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Venue Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Mahal Banquet Hall"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Phone No *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765-43210"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>No. of Guests *</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  min="1"
                  className={errors.guests ? "error" : ""}
                />
                {errors.guests && <span className="error-msg">{errors.guests}</span>}
              </div>
              <div className="form-group">
                <label>Price (₹ / day) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  min="1"
                  className={errors.price ? "error" : ""}
                />
                {errors.price && <span className="error-msg">{errors.price}</span>}
              </div>
              <div className="form-group form-full">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your venue — features, atmosphere, ideal events..."
                  rows={4}
                  className={errors.description ? "error" : ""}
                />
                {errors.description && <span className="error-msg">{errors.description}</span>}
              </div>
            </div>
          </div>

          <div className="form-section-card">
            <h3 className="section-heading">Address</h3>
            <div className="form-grid-2">
              <div className="form-group form-full">
                <label>Street *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street address"
                  className={errors.street ? "error" : ""}
                />
                {errors.street && <span className="error-msg">{errors.street}</span>}
              </div>
              <div className="form-group">
                <label>Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Locality / Area"
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <span className="error-msg">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className={errors.pincode ? "error" : ""}
                />
                {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
              </div>
            </div>
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-next" onClick={() => setActiveTab("images")}>
              Next: Images →
            </button>
          </div>
        </div>
      )}

      {/* ─── Images Tab ─── */}
      {activeTab === "images" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Venue Images</h3>
            <p className="section-note">Upload up to 6 photos of your venue (JPG, PNG). Good photos attract more bookings!</p>

            <label className="image-upload-zone">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <span className="upload-icon">📸</span>
              <span className="upload-text">Click to upload venue photos</span>
              <span className="upload-hint">JPG, PNG — up to 6 images</span>
            </label>

            {imagePreviews.length > 0 && (
              <div className="image-grid">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={src} alt={`Venue ${index + 1}`} />
                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                    {index === 0 && <span className="primary-badge">Main</span>}
                  </div>
                ))}
              </div>
            )}

            {imagePreviews.length === 0 && (
              <div className="no-images-hint">
                <span>🖼️</span>
                <p>No images uploaded yet. Add photos to make your listing stand out!</p>
              </div>
            )}
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("basic")}>
              ← Back
            </button>
            <button type="button" className="btn-next" onClick={() => setActiveTab("amenities")}>
              Next: Amenities →
            </button>
          </div>
        </div>
      )}

      {/* ─── Amenities Tab ─── */}
      {activeTab === "amenities" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Select Amenities</h3>
            <p className="section-note">Choose all amenities available at your venue.</p>

            <div className="amenities-grid">
              {AMENITIES_LIST.map(({ key, icon }) => (
                <button
                  key={key}
                  type="button"
                  className={`amenity-btn ${formData.amenities.includes(key) ? "amenity-selected" : ""}`}
                  onClick={() => toggleAmenity(key)}
                >
                  <span className="amenity-btn-icon">{icon}</span>
                  <span>{key}</span>
                  {formData.amenities.includes(key) && (
                    <span className="amenity-check">✓</span>
                  )}
                </button>
              ))}
            </div>

            {formData.amenities.length > 0 && (
              <div className="selected-amenities">
                <strong>Selected ({formData.amenities.length}):</strong>{" "}
                {formData.amenities.join(", ")}
              </div>
            )}
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("images")}>
              ← Back
            </button>
            <button type="button" className="btn-next" onClick={() => setActiveTab("food")}>
              Next: Food Menu →
            </button>
          </div>
        </div>
      )}

      {/* ─── Food Menu Tab ─── */}
      {activeTab === "food" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Food Menu</h3>
            <p className="section-note">
              Add your food menu details for banquets, weddings, and parties. List items for each category.
            </p>

            <div className="food-menu-list">
              {formData.foodMenu.map((item, index) => (
                <div key={index} className="food-menu-item">
                  <div className="food-menu-header">
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleFoodMenuChange(index, "category", e.target.value)}
                      placeholder="Category (e.g. Starters)"
                      className="food-category-input"
                    />
                    {formData.foodMenu.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove-food"
                        onClick={() => removeFoodCategory(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <textarea
                    value={item.items}
                    onChange={(e) => handleFoodMenuChange(index, "items", e.target.value)}
                    placeholder="List items separated by commas (e.g. Paneer Tikka, Chicken Tikka, Veg Platter)"
                    rows={2}
                    className="food-items-input"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn-add-category"
              onClick={addFoodCategory}
            >
              + Add Category
            </button>
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("amenities")}>
              ← Back
            </button>
            <button type="button" className="btn-next" onClick={() => setActiveTab("package")}>
              Next: Package →
            </button>
          </div>
        </div>
      )}

      {/* ─── Package Tab ─── */}
      {activeTab === "package" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Listing Package</h3>
            <p className="section-note">
              Choose a subscription plan. Commission is paid to the platform per confirmed booking as per the selected plan.
            </p>

            <div className="packages-grid">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.key}
                  className={`package-card ${formData.package === pkg.key ? "package-selected" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, package: pkg.key }))}
                >
                  <div className="package-header">
                    <h4>{pkg.title}</h4>
                    {formData.package === pkg.key && (
                      <span className="package-check">✓ Selected</span>
                    )}
                  </div>
                  <div className="package-price">{pkg.price}</div>
                  <div className="package-commission">
                    <span className="commission-badge">{pkg.commission}</span>
                  </div>
                  <p className="package-desc">{pkg.desc}</p>
                </div>
              ))}
            </div>

            {errors.package && (
              <span className="error-msg" style={{ marginTop: "8px", display: "block" }}>
                {errors.package}
              </span>
            )}

            <div className="commission-note">
              <span>ℹ️</span>
              <p>
                <strong>Note:</strong> Commission is paid to the platform per confirmed booking as per the selected plan. Monthly plan charges 5% and Yearly plan charges 3% per booking.
              </p>
            </div>
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("food")}>
              ← Back
            </button>
            <div className="form-submit-actions">
              <button type="submit" className="btn-submit-listing" disabled={loading}>
                {loading ? "Submitting..." : `🚀 ${submitLabel}`}
              </button>
              <button
                type="button"
                className="btn-cancel-form"
                onClick={() => navigate("/my-listings")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
