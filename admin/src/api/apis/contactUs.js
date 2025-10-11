import api from "../config/config";

// Create new contact
export const createContact = async (contactData) => {
    const { data } = await api.post("/contacts", contactData);
    return data;
};

// Get all contacts
export const getContacts = async () => {
    const { data } = await api.get("/contacts");
    return data;
};

// Delete contact by ID
export const deleteContact = async (id) => {
    const { data } = await api.delete(`/contacts/${id}`);
    return data;
};

