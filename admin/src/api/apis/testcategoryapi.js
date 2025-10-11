import api from "../config/config";

// Create Category
export const createCategory = async (payload) => {
    const { data } = await api.post("/testcategory", payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

// Get All Categories
export const getCategories = async () => {
    const { data } = await api.get("/testcategory");
    return data;
};

// Delete Category
export const deleteCategory = async (id) => {
    const { data } = await api.delete(`/testcategory/${id}`);
    return data;
};

export const updateCategory = async (id, payload) => {
    const { data } = await api.put(`/testcategory/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};
