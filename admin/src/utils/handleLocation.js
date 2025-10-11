import { showSuccess, showError, confirmAction } from "./alertUtils";

export const handleAddLocation = async (data, addLocation, onClose) => {
    try {
        const res = await addLocation.mutateAsync(data);
        showSuccess(res?.message || "Location added successfully!");
    } catch (err) {
        showError(err?.response?.data?.message || "Failed to add location.");
    } finally {
        onClose();
    }
};

export const handleDeleteLocation = async (locationId, tests, removeLocation) => {
    // Find tests linked with this location
    const related = tests.filter((t) =>
        t.locations?.some((loc) => loc._id === locationId)
    );
    const count = related.length;

    // Dynamic warning message
    const message =
        count > 0
            ? `This location is linked with <b>${count}</b> test${count > 1 ? "s" : ""}.<br>
            <strong>Deleting it will remove this location from those tests.<br>
            Tests with only one location will also be deleted automatically.</strong>`
            : "Are you sure you want to delete this location?";

    // Ask confirmation from user
    const confirmed = await confirmAction({
        title: "Delete Location?",
        message,
        confirmText: "Yes, delete it!",
        successMessage: "Location deleted successfully.",
        important: count > 0,
    });

    // If confirmed, proceed
    if (confirmed) {
        await removeLocation.mutateAsync(locationId);
    }
};

