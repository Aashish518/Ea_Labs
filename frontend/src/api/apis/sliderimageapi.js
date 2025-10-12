import api from "../config/config";

export const getImages = async () => {
    const { data } = await api.get("/sliders");
    return data;
};

