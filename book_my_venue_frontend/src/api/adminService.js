import api from "./api";

export const getPendingVenues = async () => {
  const response = await api.get("/admin/venues/pending");
  return response.data;
};

export const getApprovedVenues = async () => {
  const response = await api.get("/admin/venues/approved");
  return response.data;
};

export const approveVenue = async (venueId) => {
  const response = await api.patch(`/admin/venues/${venueId}/approve`);
  return response.data;
};

export const rejectVenue = async (venueId) => {
  const response = await api.patch(`/admin/venues/${venueId}/reject`);
  return response.data;
};