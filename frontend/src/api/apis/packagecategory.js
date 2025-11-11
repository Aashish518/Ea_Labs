import api from "../config/config";

export const getAllTestPackages = async () => {
    const { data } = await api.get("/api/testpackagecategory");
    return data;
};

export const getTestsByPackageId = async (packageId) => {
    const { data } = await api.get(`/api/testpackagecategory/tests/${packageId}`);
    return data;
};