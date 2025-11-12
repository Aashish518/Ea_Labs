import api from "../config/config";

export const getAllAboutUs = async () => {
  const { data } = await api.get("/api/aboutus");
  return data;
};