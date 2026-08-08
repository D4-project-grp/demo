import api from "./api";

export const createBooking = async (bookingData) => {
    console.log("in booking service")
    const response = await api.post(`/bookings`, bookingData);
    return response.data;
};
  
export const checkVenueAvailability = (venueId, startDate, endDate) =>
    api.get(`/venues/${venueId}/availability`, { params: { startDate, endDate } });