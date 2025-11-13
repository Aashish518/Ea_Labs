import api from "../config/config";

export const getLocations = async () => {
    const { data } = await api.get("/api/location");
    return data;
};