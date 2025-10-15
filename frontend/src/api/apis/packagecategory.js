import api from "../config/config";

export const getAllTestPackages = async () => {
    const { data } = await api.get("/testpackagecategory");
    return data;
};