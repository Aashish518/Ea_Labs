import api from "../config/config";

// Create new test menu
export const createTestMenu = async (testMenuData) => {
    const { data } = await api.post("/testmenu", testMenuData);
    return data;
};

// Get all test menus
export const getAllTestMenus = async () => {
    const { data } = await api.get("/testmenu");
    return data;
};

// Get a single test menu by ID
export const getTestMenuById = async (id) => {
    const { data } = await api.get(`/testmenu/${id}`);
    return data;
};

// Update a test menu by ID
export const updateTestMenu = async (id, updatedData) => {
    const { data } = await api.put(`/testmenu/${id}`, updatedData);
    return data;
};

// Delete a test menu by ID
export const deleteTestMenu = async (id) => {
    const { data } = await api.delete(`/testmenu/${id}`);
    return data;
};
