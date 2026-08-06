import api from "./api";
import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2003";
export const addVenue=async(fd)=>{
    return await api.post(`/venues`, fd);
}
export const getAllAmenities=async()=>{
   
    return  await axios.get(`${API_BASE_URL}/api/amenity`)
   
}
export const getSubscriptionPackages=async()=>{
    return await axios.get(`${API_BASE_URL}/api/subscription`);
}
export const getAllVenuesByOwnerId=async()=>{
    const response= await api.get(`/venues/my-listing`);
     
    return response.data;
}
export const getAllVenues=async()=>{
    const response= await api.get(`/venues`);
    console.log(response)
    return response.data;
}