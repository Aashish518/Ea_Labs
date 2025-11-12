import api from "../config/config";

// ✅ Create new AboutUs entry (with image)
export const createAboutUs = async (formData) => {
  const { data } = await api.post("/aboutus", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// ✅ Get all AboutUs entries
export const getAllAboutUs = async () => {
  const { data } = await api.get("/aboutus");
  return data;
};

// ✅ Get single AboutUs by ID
export const getAboutUsById = async (id) => {
  const { data } = await api.get(`/aboutus/${id}`);
  return data;
};

// ✅ Update AboutUs entry (with optional new image)
export const updateAboutUs = async (id, formData) => {
  const { data } = await api.put(`/aboutus/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// ✅ Delete AboutUs entry
export const deleteAboutUs = async (id) => {
  const { data } = await api.delete(`/aboutus/${id}`);
  return data;
};
