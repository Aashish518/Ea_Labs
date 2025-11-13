import api from "../config/config";

export const getCategoriesWithTests = async (locationName) => {
    const { data } = await api.get(`/api/tests/bylocation?locationName=${locationName}`);
    return data;
};

export const getTest = async (locationName) => {
    const { data } = await api.get(`/api/tests/bylocation?locationName=${locationName}`);
    return data;
};