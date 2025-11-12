import axios from "axios";
const API_URL = `${import.meta.env.VITE_BACK_URL}/api/resource`;

export const getAllResources = async () => {
  const { data } = await axios.get(API_URL);
  return data.data;
};

export const createResource = async (formData) => {
  const { data } = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const updateResource = async (id, formData) => {
  const { data } = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteResource = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
