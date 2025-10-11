// src/api/visitor.js
import api from "../config/config";

// Track Visitor (GET request)
export const trackVisitor = async () => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
        const { data } = await api.get("/visitor");
        localStorage.setItem("visited", "true");
        return data;
    } else {
        const { data } = await api.get("/visitor");
        return data;
    }
};
