import api from "../config/config";

// Get all locations
export const getLocations = async () => {
    const { data } = await api.get("/location");
    return data;
};