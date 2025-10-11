import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocations, createLocation, deleteLocation } from "../api/apis/testlocation";

export const useLocations = () => {
    const queryClient = useQueryClient();

    const { data: locations = [] } = useQuery({
        queryKey: ["locations"],
        queryFn: getLocations,
    });

    const addLocation = useMutation({
        mutationFn: createLocation,
        onSuccess: () => queryClient.invalidateQueries(["locations"]),
    });

    const removeLocation = useMutation({
        mutationFn: deleteLocation,
        onSuccess: () => queryClient.invalidateQueries(["locations"]),
    });

    return { locations, addLocation, removeLocation };
};
