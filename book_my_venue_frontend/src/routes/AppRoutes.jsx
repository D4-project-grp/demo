import { Routes, Route } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import ProtectedRoute from "./ProtectedRoute";



import AdminLayout from "../layouts/AdminLayout";
import VenueOwnerLayout from "../layouts/VenueOwnerLayout";
import CustomerLayout from "../layouts/CustomerLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAllVenues from "../pages/admin/AdminAllVenues";
import AdminAllBookings from "../pages/admin/AdminAllBookings";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminCommission from "../pages/admin/AdminCommission";
import AdminEditProfile from "../pages/admin/AdminEditProfile";

// Owner Pages
// import Dashboard from "../pages/venue_owner/Dashboard";
import AddVenue from "../pages/venue_owner/AddVenue";
import MyListings from "../pages/venue_owner/MyListings";
import CurrentBookings from "../pages/venue_owner/CurrentBookings";
import OldBookings from "../pages/venue_owner/OldBookings";
import EditProfile from "../pages/venue_owner/EditProfile";
import Dashboard from "../pages/venue_owner/Dashboard";

// Customer Pages
import Home from "../pages/customer/Home";
import VenueDetails from "../pages/customer/VenueDetails";
import Navbar from "../components/customer/Navbar";
import SearchResults from "../components/customer/SearchResults"
import Footer from "../components/customer/Footer"
import CustomerEditProfile from "../pages/customer/CustomerEditProfile";
import BookingPage from "../pages/customer/BookingPage"
import PaymentPage from "../pages/customer/PaymentPage"
import BookingConfirmation from "../pages/customer/BookingConfirmation";
 
const AppRoutes = () => {
    return (
        
        <Routes>
            
            {/* Public Routes */}
           
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route element={<CustomerLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/venues" element={<SearchResults />} />
                <Route path="/venue/:venueId" element={<VenueDetails />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/payment/:id" element={<PaymentPage />} />
                <Route
                    path="/booking-confirmation/:bookingId"
                    element={<BookingConfirmation />}
                />
            </Route>
            {/* Admin */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }

            >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="venues" element={<AdminAllVenues />} />
                <Route path="bookings" element={<AdminAllBookings />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="commission" element={<AdminCommission />} />
                <Route path="profile" element={<AdminEditProfile />} />
            </Route>

            {/* Venue Owner */}
            <Route
                path="/owner"
                element={
                    <ProtectedRoute allowedRoles={["VENUE_OWNER"]}>
                        <VenueOwnerLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="add-venue" element={<AddVenue />} />
                <Route path="my-listings" element={<MyListings />} />
                {/* <Route path="bookings/current-bookings" element={<CurrentBookings />} /> */}
                {/* <Route path="bookings/old-bookings" element={<OldBookings />} /> */}
                <Route path="edit-profile" element={<EditProfile />} />
            </Route>

            {/* Customer */}
            {/* <Route
                path="/customer"
                element={
                    <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                        <CustomerLayout />
                    </ProtectedRoute>
                }

            >

                <Route index element={<EditProfile />} />
                <Route path="profile" element={<CustomerEditProfile />} />
                <Route path="bookings/current" element={<CurrentBookings />} />
                <Route path="bookings/history" element={<OldBookings />} />

            </Route> */}
            <Route
                path="/customer"
                element={

                    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                        
                        <CustomerLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="profile" element={<CustomerEditProfile />} />
                <Route path="bookings/current" element={<CurrentBookings />} />
                <Route path="bookings/history" element={<OldBookings />} />
            </Route>

        </Routes>
    );
};

export default AppRoutes;