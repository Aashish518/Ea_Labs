import api from "../config/config"; 

// Get all location
export const getLocations = async () => {
    const response = await api.get("/location");
    return response.data;
};

// Create new location
export const createLocation = async (data) => {
    const response = await api.post("/location", data);
    return response.data;
};

// Delete location by id
export const deleteLocation = async (id) => {
    const response = await api.delete(`/location/${id}`);
    return response.data;
};
