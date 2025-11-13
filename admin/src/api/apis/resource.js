import api from "../config/config";

// Get all resources
export const getAllResources = async () => {
  const { data } = await api.get("/resource");
  return data.data;
};

// Create a new resource
export const createResource = async (formData) => {
  const { data } = await api.post("/resource", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

// Update an existing resource
export const updateResource = async (id, formData) => {
  const { data } = await api.put(`/resource/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

// Delete a resource
export const deleteResource = async (id) => {
  const { data } = await api.delete(`/resource/${id}`);
  return data;
};
