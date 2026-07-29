import React, { createContext, useContext, useState } from "react";
import { mockVenues, mockCurrentBookings, mockOldBookings, mockOwnerProfile } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [venues, setVenues] = useState(mockVenues);
  const [currentBookings] = useState(mockCurrentBookings);
  const [oldBookings] = useState(mockOldBookings);
  const [ownerProfile, setOwnerProfile] = useState(mockOwnerProfile);

  const login = (email, password) => {
    // Simulate login
    setCurrentUser({
      firstName: ownerProfile.firstName,
      lastName: ownerProfile.lastName,
      email: email,
      role: "Venue Owner",
    });
    setIsLoggedIn(true);
    return true;
  };

  const register = (data) => {
    setCurrentUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    });
    setOwnerProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      street: data.street,
      locality: data.locality,
      city: data.city,
      pincode: data.pincode,
    });
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const addVenue = (venue) => {
    const newVenue = { ...venue, id: Date.now(), status: "pending_approval" };
    setVenues((prev) => [...prev, newVenue]);
    return newVenue;
  };

  const updateVenue = (id, updatedData) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updatedData } : v))
    );
  };

  const deleteVenue = (id) => {
    setVenues((prev) => prev.filter((v) => v.id !== id));
  };

  const updateProfile = (data) => {
    setOwnerProfile(data);
    setCurrentUser((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        venues,
        currentBookings,
        oldBookings,
        ownerProfile,
        login,
        register,
        logout,
        addVenue,
        updateVenue,
        deleteVenue,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
