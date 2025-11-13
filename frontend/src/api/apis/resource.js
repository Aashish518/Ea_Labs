import api from "../config/config";

export const getAllResources = async () => {
  const { data } = await api.get("/api/resource");
  return data.data; 
};
