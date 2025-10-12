import api from "../config/config";

// Create new location
export const createLocation = async (locationData) => {
    const { data } = await api.post("/location", locationData);
    return data;
};

// Get all locations
export const getLocations = async () => {
    const { data } = await api.get("/location");
    return data;
};

// Delete location by id
export const deleteLocation = async (id) => {
    const { data } = await api.delete(`/location/${id}`);
    return data;
};
