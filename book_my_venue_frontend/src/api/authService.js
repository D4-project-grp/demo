 
 
// export default api;
import api from "./api";

export const login = (email, password) => {
  return api.post("/auth/signin", {
    email,
    password,
  });
};

export const signup = (formData) => {
  return api.post("/auth/signup", formData);
};

export const getUserProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};
export const updateProfile = async (formData) => {
  const { data } = await api.post("/auth/profile",formData);
  return data;
};