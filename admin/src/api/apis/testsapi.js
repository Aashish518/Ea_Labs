import api from "../config/config";

// Create Test
export const createTest = async (payload) => {
    const { data } = await api.post("/tests", payload);
    return data;
};

// Get All Tests
export const getTests = async () => {
    const { data } = await api.get("/tests");
    return data;
};

// Get Test by ID
export const getTestById = async (id) => {
    const { data } = await api.get(`/tests/${id}`);
    return data;
};

// Update Test
export const updateTest = async (id, payload) => {
    const { data } = await api.put(`/tests/${id}`, payload);
    return data;
};

// Delete Test
export const deleteTest = async (id) => {
    const { data } = await api.delete(`/tests/${id}`);
    return data;
};
