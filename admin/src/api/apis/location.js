import api from "../config/config";

// Create new location
export const createLocation = async (locationData) => {
    const { data } = await api.post("/locations", locationData);
    return data;
};

// Get all locations
export const getLocations = async () => {
    const { data } = await api.get("/locations");
    return data;
};

// Delete location by id
export const deleteLocation = async (id) => {
    const { data } = await api.delete(`/locations/${id}`);
    return data;
};
