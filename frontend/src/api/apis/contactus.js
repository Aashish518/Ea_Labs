import api from "../config/config";

export const createContact = async (contactData) => {
    const { data } = await api.post("/api/contacts", contactData);
    return data;
};