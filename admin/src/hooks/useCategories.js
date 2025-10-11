import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory, // import update API
} from "../api/apis/testcategoryapi";

export const useCategories = () => {
    const queryClient = useQueryClient();

    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const addCategory = useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries(["categories"]),
    });

    const removeCategory = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["tests"]);
        },
    });

    const editCategory = useMutation({
        mutationFn: ({ id, data }) => updateCategory(id, data), // call backend update
        onSuccess: () => queryClient.invalidateQueries(["categories"]),
    });

    return {
        categories: categoriesData?.categories || [],
        addCategory,
        removeCategory,
        editCategory, // expose update mutation
    };
};
