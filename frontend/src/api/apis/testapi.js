import api from "../config/config";

// API call
export const getCategoriesWithTests = async (locationName) => {
    const { data } = await api.get(`/tests/bylocation?locationName=${locationName}`);
    return data;
};

export const getTest = async (locationName) => {
    const { data } = await api.get(`/tests/bylocation?locationName=${locationName}`);
    return data;
};