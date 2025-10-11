import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTests, createTest, updateTest, deleteTest } from "../api/apis/testsapi";

export const useTests = () => {
    const queryClient = useQueryClient();

    const { data: tests = [] } = useQuery({
        queryKey: ["tests"],
        queryFn: getTests,
    });

    const addTest = useMutation({
        mutationFn: createTest,
        onSuccess: () => queryClient.invalidateQueries(["tests"]),
    });

    const editTest = useMutation({
        mutationFn: ({ id, data }) => updateTest(id, data),
        onSuccess: () => queryClient.invalidateQueries(["tests"]),
    });

    const removeTest = useMutation({
        mutationFn: deleteTest,
        onSuccess: () => queryClient.invalidateQueries(["tests"]),
    });

    return { tests, addTest, editTest, removeTest };
};
