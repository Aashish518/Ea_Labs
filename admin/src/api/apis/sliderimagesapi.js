import api from "../config/config";

export const getImages = async () => {
    const { data } = await api.get("/sliders");
    return data;
};

export const uploadImages = async ({ type, files }) => {
    const formData = new FormData();

    files.forEach(file => {
        formData.append(type, file); 
    });

    const { data } = await api.post("/sliders", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
};

export const updateVisiblityStatus = async (mediaId) => {
    const response = await api.put(`/sliders/${mediaId}`); // no object needed
    return response.data;
};




export const deleteImage = async ({ id, type, path }) => {
    const { data } = await api.delete(`/sliders/${id}`, {
        data: { type, path }
    });
    return data;
};

export const deleteAllImage = async () => {
    const { data } = await api.delete(`/sliders`);
    return data;
};
