// import api from "../config/config";

// export const addTestItem = async (formData) => {
//     const { data } = await api.post("/testpackagecategory", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return data;
// };

// export const getAllTestPackages = async () => {
//     const { data } = await api.get("/testpackagecategory");
//     return data;
// };

// export const updateTestItem = async (itemId, formData) => {
//     const { data } = await api.put(`/testpackagecategory/${itemId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return data;
// };

// export const deleteTestItem = async (itemId) => {
//     const { data } = await api.delete(`/testpackagecategory/${itemId}`);
//     return data;
// };


import api from "../config/config";

// ➕ Add a new test package
export const addTestPackage = async (formData) => {
    const { data } = await api.post("/testpackagecategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

// 📦 Get all test packages
export const getAllTestPackages = async () => {
    const { data } = await api.get("/testpackagecategory");
    return data;
};

// 📝 Update a test package
export const updateTestPackage = async (id, formData) => {
    const { data } = await api.put(`/testpackagecategory/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

// ❌ Delete a test package
export const deleteTestPackage = async (id) => {
    const { data } = await api.delete(`/testpackagecategory/${id}`);
    return data;
};
