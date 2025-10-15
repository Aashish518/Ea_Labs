import api from "../config/config";

export const getAllTestMenus = async (page = 1, limit = 10, letter = "") => {
    const { data } = await api.get("/testmenu/page", {
        params: { page, limit, letter }, 
    });
    return data;
};
