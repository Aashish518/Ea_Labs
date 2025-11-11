import api from "../config/config";

// Create new contact
export const createContact = async (contactData) => {
    const { data } = await api.post("/api/contacts", contactData);
    return data;
};