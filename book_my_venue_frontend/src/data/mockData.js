export const mockVenues = [
  {
    id: 1,
    name: "Sunbeam Pune",
    phone: "+91 98765-43210",
    guests: 500,
    description: "A luxurious grand hall perfect for large weddings and corporate events. Features state-of-the-art sound systems, elegant décor, and a professional catering team.",
    price: 50960,
    street: "12, MG Road",
    locality: "Andheri East",
    city: "Mumbai",
    pincode: "400069",
    images: [],
    amenities: ["Parking", "AC", "Elevator", "WiFi", "CCTV", "Generator", "Catering", "Stage"],
    package: "yearly",
    status: "active",
    foodMenu: [
      { category: "Starters", items: "Paneer Tikka, Chicken Tikka, Veg Platter, Soup" },
      { category: "Main Course", items: "Dal Makhani, Butter Chicken, Biryani, Naan, Rice" },
      { category: "Desserts", items: "Gulab Jamun, Ice Cream, Rasgulla, Kheer" },
      { category: "Beverages", items: "Soft Drinks, Lassi, Juice, Tea, Coffee" },
    ],
  },
  {
    id: 7,
    name: "Saffron PG",
    phone: "+91 91234-56789",
    guests: 100,
    description: "A stunning rooftop venue with panoramic city views. Ideal for intimate gatherings, cocktail parties, and small celebrations.",
    price: 26000,
    street: "45, FC Road",
    locality: "Shivajinagar",
    city: "Pune",
    pincode: "411005",
    images: [],
    amenities: ["Parking", "AC", "WiFi", "CCTV", "Catering"],
    package: "monthly",
    status: "active",
    foodMenu: [
      { category: "Starters", items: "Bruschetta, Spring Rolls, Mini Sliders" },
      { category: "Main Course", items: "Pasta, Pizza, Grilled Chicken, Salads" },
      { category: "Desserts", items: "Tiramisu, Cheesecake, Brownies" },
      { category: "Beverages", items: "Mocktails, Fresh Juices, Coffee, Tea" },
    ],
  },
  {
    id: 3,
    name: "Palladium",
    phone: "+91 87654-32109",
    guests: 150,
    description: "A serene garden venue surrounded by lush greenery. Perfect for outdoor weddings, birthday parties, and cultural events.",
    price: 35960,
    street: "78, Gangapur Road",
    locality: "Nashik West",
    city: "Nashik",
    pincode: "422013",
    images: [],
    amenities: ["Parking", "Generator", "Catering", "Stage", "Projector"],
    package: "yearly",
    status: "active",
    foodMenu: [
      { category: "Starters", items: "Samosa, Dhokla, Pav Bhaji, Chaat" },
      { category: "Main Course", items: "Shahi Paneer, Mutton Curry, Pulao, Roti" },
      { category: "Desserts", items: "Jalebi, Barfi, Halwa, Modak" },
      { category: "Beverages", items: "Thandai, Sherbat, Buttermilk, Tea" },
    ],
  },
];

export const mockCurrentBookings = [
  {
    id: "BK-2024-001",
    customer: "Nikita Palde",
    mobile: "+91 98001-11222",
    venue: "Grand Hall",
    startDate: "2024-12-20",
    endDate: "2024-12-21",
    guests: 350,
    cost: 101920,
    status: "Confirmed",
  },
  {
    id: "BK-2024-002",
    customer: "Sushant Waghmare",
    mobile: "+91 97002-22333",
    venue: "Rooftop Lounge",
    startDate: "2024-12-25",
    endDate: "2024-12-25",
    guests: 80,
    cost: 26000,
    status: "Confirmed",
  },
  {
    id: "BK-2024-003",
    customer: "Vedant Desai",
    mobile: "+91 96003-33444",
    venue: "Garden View",
    startDate: "2024-12-28",
    endDate: "2024-12-29",
    guests: 120,
    cost: 71920,
    status: "Pending",
  },
  {
    id: "BK-2024-004",
    customer: "Rushi Dudhal",
    mobile: "+91 95004-44555",
    venue: "Grand Hall",
    startDate: "2025-01-05",
    endDate: "2025-01-06",
    guests: 450,
    cost: 101920,
    status: "Confirmed",
  },
];

export const mockOldBookings = [
  {
    id: "BK-2024-090",
    customer: "Pooja Jaiswal",
    mobile: "+91 94005-55666",
    venue: "Grand Hall",
    startDate: "2024-10-15",
    endDate: "2024-10-16",
    guests: 400,
    cost: 101920,
    status: "Completed",
  },
  {
    id: "BK-2024-091",
    customer: "Aditya Sable",
    mobile: "+91 93006-66777",
    venue: "Rooftop Lounge",
    startDate: "2024-10-20",
    endDate: "2024-10-20",
    guests: 75,
    cost: 26000,
    status: "Completed",
  },
  {
    id: "BK-2024-092",
    customer: "Nilesh Pawar",
    mobile: "+91 92007-77888",
    venue: "Garden View",
    startDate: "2024-11-02",
    endDate: "2024-11-03",
    guests: 130,
    cost: 71920,
    status: "Completed",
  },
  {
    id: "BK-2024-093",
    customer: "Ketan Kore",
    mobile: "+91 91008-88999",
    venue: "Grand Hall",
    startDate: "2024-11-18",
    endDate: "2024-11-19",
    guests: 480,
    cost: 101920,
    status: "Completed",
  },
  {
    id: "BK-2024-094",
    customer: "Rohan Paramane",
    mobile: "+91 90009-99000",
    venue: "Rooftop Lounge",
    startDate: "2024-11-25",
    endDate: "2024-11-25",
    guests: 90,
    cost: 26000,
    status: "Completed",
  },
];

export const mockOwnerProfile = {
  firstName: "Nikita",
  lastName: "Palde",
  email: "nikita@gmail.com",
  mobile: "+91 9080-43210",
  street: "near Saffron pg",
  locality: "Hinjewadi phase 2",
  city: "Pune",
  pincode: "411057",
};
 // Mock "backend" built on top of localStorage.
// Mirrors the DB schema: users, venues, venue_images, amenities, venue_amenities,
// menus, food_items, food_images, bookings, booked_food_items, reviews, review_photos, payments.

const IMG = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const AMENITY_POOL = [
  { amenity_id: 1, amenity_name: "Free WiFi" },
  { amenity_id: 2, amenity_name: "Parking" },
  { amenity_id: 3, amenity_name: "Elevator" },
  { amenity_id: 4, amenity_name: "Power Backup" },
  { amenity_id: 5, amenity_name: "Air Conditioning" },
  { amenity_id: 6, amenity_name: "Catering" },
  { amenity_id: 7, amenity_name: "DJ / Music System" },
  { amenity_id: 8, amenity_name: "Decoration" },
  { amenity_id: 9, amenity_name: "Swimming Pool" },
  { amenity_id: 10, amenity_name: "Bridal Room" },
];

const VENUE_NAMES = [
  "The Grand Pavilion", "Royal Orchid Gardens", "Sapphire Banquet Hall",
  "Emerald Lawns", "The Regal Palace", "Silver Oak Resort",
  "Golden Petals Farmhouse", "Crystal Convention Center", "Lotus Terrace",
  "The Wedding Villa", "Pearl Gardens", "Amber Sky Rooftop",
];

const LOCALITIES = ["Kothrud", "Baner", "Viman Nagar", "Hinjewadi", "Koregaon Park", "Wakad"];
const CITIES = ["Pune", "Mumbai", "Nashik", "Nagpur"];

function seedVenues() {
  return VENUE_NAMES.map((name, i) => {
    const venue_id = i + 1;
    return {
      venue_id,
      venue_name: name,
      status: "ACTIVE",
      phone_no: `98765${(43210 + i).toString().slice(-5)}`,
      guest_capacity: 100 + i * 50,
      price: 40000 + i * 15000,
      user_id: 999, // owner placeholder
      street: `${100 + i} Main Street`,
      locality: LOCALITIES[i % LOCALITIES.length],
      city: CITIES[i % CITIES.length],
      pincode: 411000 + i,
      created_at: new Date(2025, 0, i + 1).toISOString(),
      popularity: Math.floor(Math.random() * 500) + 50,
      images: [IMG(`venue${venue_id}a`), IMG(`venue${venue_id}b`), IMG(`venue${venue_id}c`), IMG(`venue${venue_id}d`)],
      amenity_ids: AMENITY_POOL.filter(() => Math.random() > 0.4).map((a) => a.amenity_id),
    };
  });
}

// Matches: public enum MenuType { WELCOME_DRINKS, WELCOME_SNACKS_STARTERS,
//   MAIN_COURSE_VEGETARIAN, MAIN_COURSE_NON_VEGETARIAN, DESSERT }
export const MENU_TYPES = [
  { key: "WELCOME_DRINKS", label: "Welcome Drinks" },
  { key: "WELCOME_SNACKS_STARTERS", label: "Welcome Snacks & Starters" },
  { key: "MAIN_COURSE_VEGETARIAN", label: "Main Course (Vegetarian)" },
  { key: "MAIN_COURSE_NON_VEGETARIAN", label: "Main Course (Non-Vegetarian)" },
  { key: "DESSERT", label: "Dessert" },
];

// food_type on the food item itself (independent of which menu it's listed under,
// since e.g. starters/drinks/desserts can be either veg or non-veg)
export const FOOD_TYPES = { VEG: "VEG", NON_VEG: "NON_VEG" };

// Template catalog: [name, foodType, basePrice, description, imageSeedTag]
const CATALOG_BY_MENU = {
  WELCOME_DRINKS: [
    ["Fresh Watermelon Cooler", "VEG", 80, "Chilled watermelon juice with a hint of mint.", "drink-watermelon"],
    ["Virgin Mojito", "VEG", 90, "Refreshing lime, mint and soda mocktail.", "drink-mojito"],
    ["Masala Chaas", "VEG", 60, "Spiced buttermilk, a classic welcome drink.", "drink-chaas"],
    ["Fresh Orange Juice", "VEG", 85, "Freshly squeezed oranges, served chilled.", "drink-orange"],
  ],
  WELCOME_SNACKS_STARTERS: [
    ["Paneer Tikka", "VEG", 180, "Char-grilled cottage cheese marinated in spices.", "starter-paneer"],
    ["Veg Spring Rolls", "VEG", 150, "Crispy rolls stuffed with fresh vegetables.", "starter-springroll"],
    ["Chicken Seekh Kebab", "NON_VEG", 220, "Minced chicken skewers grilled to perfection.", "starter-seekh"],
    ["Fish Amritsari", "NON_VEG", 240, "Batter-fried fish with tangy spices.", "starter-fish"],
    ["Corn Cheese Balls", "VEG", 160, "Crispy fried balls of corn and cheese.", "starter-corncheese"],
    ["Chicken Lollipop", "NON_VEG", 230, "Spiced and deep-fried chicken drumettes.", "starter-lollipop"],
  ],
  MAIN_COURSE_VEGETARIAN: [
    ["Veg Biryani", "VEG", 200, "Fragrant basmati rice cooked with mixed vegetables.", "main-vegbiryani"],
    ["Dal Makhani", "VEG", 170, "Slow-cooked black lentils in a rich buttery gravy.", "main-dalmakhani"],
    ["Paneer Butter Masala", "VEG", 210, "Cottage cheese cubes in a creamy tomato gravy.", "main-panneerbm"],
    ["Malai Kofta", "VEG", 200, "Fried vegetable dumplings in a creamy cashew gravy.", "main-kofta"],
  ],
  MAIN_COURSE_NON_VEGETARIAN: [
    ["Butter Chicken", "NON_VEG", 260, "Tender chicken in a creamy tomato-butter gravy.", "main-butterchicken"],
    ["Mutton Rogan Josh", "NON_VEG", 320, "Slow-cooked mutton curry in aromatic spices.", "main-roganjosh"],
    ["Chicken Biryani", "NON_VEG", 240, "Layered basmati rice with spiced chicken.", "main-chickenbiryani"],
    ["Fish Curry", "NON_VEG", 280, "Coastal-style fish curry in coconut gravy.", "main-fishcurry"],
  ],
  DESSERT: [
    ["Gulab Jamun", "VEG", 90, "Soft milk dumplings soaked in sugar syrup.", "dessert-gulabjamun"],
    ["Chocolate Mousse", "VEG", 120, "Rich and creamy chocolate mousse cups.", "dessert-mousse"],
    ["Rasmalai", "VEG", 110, "Soft paneer discs soaked in sweetened milk.", "dessert-rasmalai"],
    ["Ice Cream Sundae", "VEG", 100, "Assorted ice cream scoops with toppings.", "dessert-sundae"],
  ],
};

function seedMenusAndFood(venues) {
  const menus = [];
  const foodItems = [];
  let menuId = 1;
  let foodId = 1;

  venues.forEach((venue) => {
    MENU_TYPES.forEach((mt) => {
      const menu = {
        menu_id: menuId++,
        menu_name: mt.label,
        menu_type: mt.key,
        venue_id: venue.venue_id,
      };
      menus.push(menu);

      CATALOG_BY_MENU[mt.key].forEach(([food_name, food_type, basePrice, description, seedTag]) => {
        foodItems.push({
          food_id: foodId,
          food_name,
          food_type,
          menu_type: mt.key,
          description,
          price: basePrice + (venue.venue_id % 4) * 10,
          menu_id: menu.menu_id,
          venue_id: venue.venue_id,
          images: [
            IMG(`${seedTag}-${venue.venue_id}-1`, 500, 400),
            IMG(`${seedTag}-${venue.venue_id}-2`, 500, 400),
            IMG(`${seedTag}-${venue.venue_id}-3`, 500, 400),
          ],
        });
        foodId++;
      });
    });
  });

  return { menus, foodItems };
}

function seedReviews() {
  const reviewers = ["Aarav Sharma", "Priya Patel", "Rohan Mehta", "Sneha Kulkarni", "Vikram Singh", "Ananya Iyer"];
  const notes = [
    "Absolutely wonderful venue, staff was very cooperative and the decor was beautiful.",
    "Great experience overall, though parking was a bit tight during peak hours.",
    "Loved the ambience! Perfect for our wedding reception.",
    "Good value for money. Would recommend to others planning a celebration.",
    "The venue manager was very helpful throughout the planning process.",
    "Food and hospitality were excellent, guests were impressed.",
  ];
  let review_id = 1;
  const reviews = [];
  for (let v = 1; v <= 12; v++) {
    const count = 2 + (v % 4);
    for (let i = 0; i < count; i++) {
      reviews.push({
        review_id: review_id++,
        venue_id: v,
        booking_id: 1000 + review_id,
        user_name: reviewers[(v + i) % reviewers.length],
        note: notes[(v + i) % notes.length],
        rating: 3 + ((v + i) % 3),
        created_at: new Date(2025, (v + i) % 12, ((v + i) % 27) + 1).toISOString(),
        photos: i % 2 === 0 ? [IMG(`review${review_id}`, 300, 300)] : [],
      });
    }
  }
  return reviews;
}

export const AMENITIES = AMENITY_POOL;

function seed() {
  if (!localStorage.getItem("vb_venues")) {
   localStorage.setItem("vb_venues", JSON.stringify(seedVenues()));
  }
  if (!localStorage.getItem("vb_reviews")) {
   localStorage.setItem("vb_reviews", JSON.stringify(seedReviews()));
  }
  if (!localStorage.getItem("vb_users")) {
   localStorage.setItem("vb_users", JSON.stringify([]));
  }
  if (!localStorage.getItem("vb_bookings")) {
   localStorage.setItem("vb_bookings", JSON.stringify([]));
  }
}
seed();

const read = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Menus & food items are derived deterministically from the seeded venues
// (mirrors the `menus` / `food_items` tables, each menu scoped to a venue_id).
const { menus: ALL_MENUS, foodItems: ALL_FOOD_ITEMS } = seedMenusAndFood(read("vb_venues"));
export const MENUS = ALL_MENUS;
export const FOOD_ITEMS = ALL_FOOD_ITEMS;

export const db = {
  getVenues: () => read("vb_venues"),
  getVenue: (id) => read("vb_venues").find((v) => v.venue_id === Number(id)),
  getReviewsForVenue: (id) => read("vb_reviews").filter((r) => r.venue_id === Number(id)),
  addReview: (review) => {
    const reviews = read("vb_reviews");
    review.review_id = Math.max(0, ...reviews.map((r) => r.review_id)) + 1;
    review.created_at = new Date().toISOString();
    reviews.push(review);
    write("vb_reviews", reviews);
    return review;
  },
  getAmenitiesForVenue: (venue) => AMENITY_POOL.filter((a) => venue.amenity_ids.includes(a.amenity_id)),

  // Menus & food
  getMenusForVenue: (venueId) => ALL_MENUS.filter((m) => m.venue_id === Number(venueId)),
  getFoodItemsForVenue: (venueId) => ALL_FOOD_ITEMS.filter((f) => f.venue_id === Number(venueId)),
  getFoodItemsGroupedByMenuType: (venueId) => {
    const items = ALL_FOOD_ITEMS.filter((f) => f.venue_id === Number(venueId));
    return MENU_TYPES.map((mt) => ({
      ...mt,
      items: items.filter((f) => f.menu_type === mt.key),
    }));
  },
  getFoodItem: (foodId) => ALL_FOOD_ITEMS.find((f) => f.food_id === Number(foodId)),

  // Users
  getUsers: () => read("vb_users"),
  findUserByEmail: (email) => read("vb_users").find((u) => u.email.toLowerCase() === email.toLowerCase()),
  createUser: (user) => {
    const users = read("vb_users");
    user.user_id = Math.max(0, ...users.map((u) => u.user_id)) + 1;
    user.role = "ROLE_CUSTOMER";
    user.created_at = new Date().toISOString();
    users.push(user);
    write("vb_users", users);
    return user;
  },
  updateUser: (userId, updates) => {
    const users = read("vb_users");
    const idx = users.findIndex((u) => u.user_id === userId);
    if (idx > -1) {
      users[idx] = { ...users[idx], ...updates, updated_at: new Date().toISOString() };
      write("vb_users", users);
      return users[idx];
    }
    return null;
  },

  // Bookings
  getBookings: () => read("vb_bookings"),
  getBookingsForUser: (userId) => read("vb_bookings").filter((b) => b.user_id === userId),
  getBooking: (id) => read("vb_bookings").find((b) => b.booking_id === Number(id)),
  createBooking: (booking) => {
    const bookings = read("vb_bookings");
    booking.booking_id = Math.max(1000, ...bookings.map((b) => b.booking_id)) + 1;
    booking.booked_at = new Date().toISOString();
    booking.status = "PENDING_PAYMENT";
    bookings.push(booking);
    write("vb_bookings", bookings);
    return booking;
  },
  updateBooking: (id, updates) => {
    const bookings = read("vb_bookings");
    const idx = bookings.findIndex((b) => b.booking_id === Number(id));
    if (idx > -1) {
      bookings[idx] = { ...bookings[idx], ...updates };
      write("vb_bookings", bookings);
      return bookings[idx];
    }
    return null;
  },
};

export const  dummyBookings = [
     {
      id: 1001,
      venueId: 1,
      eventType: "Wedding",
      guests: 250,
      startOffsetDays: 30,
      endOffsetDays: 31,
      status: "CONFIRMED",
      menuTypes: ["WELCOME_DRINKS", "MAIN_COURSE_VEGETARIAN", "DESSERT"],
    } ,
    {
      id: 1002,
      venueId: 3,
      eventType: "Birthday",
      guests: 80,
      startOffsetDays: 12,
      endOffsetDays: 12,
      status: "CONFIRMED",
      menuTypes: ["WELCOME_SNACKS_STARTERS", "DESSERT"],
    } ,
   {
      id: 1003,
      venueId: 7,
      eventType: "Engagement",
      guests: 150,
      startOffsetDays: 20,
      endOffsetDays: 20,
      status: "PENDING_PAYMENT",
      menuTypes: ["WELCOME_DRINKS", "MAIN_COURSE_NON_VEGETARIAN"],
    } 
  ] 