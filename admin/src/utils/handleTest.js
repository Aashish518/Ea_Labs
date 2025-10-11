import { showSuccess, showError, confirmAction } from "./alertUtils";

export const handleAddTest = async (data, editingTest, addTest, editTest, onClose) => {
    try {
        if (editingTest) {
            await editTest.mutateAsync({ id: editingTest._id, data });
            showSuccess("Test updated successfully!");
        } else {
            await addTest.mutateAsync(data);
            showSuccess("Test added successfully!");
        }
    } catch (err) {
        showError("Failed to save test.");
    } finally {
        onClose();
    }
};

export const handleDeleteTest = async (id, removeTest) => {
    const confirmed = await confirmAction({
        title: "Delete Test?",
        message: "Are you sure you want to delete this test?",
        confirmText: "Yes, delete it!",
        successMessage: "Test deleted successfully!",
    });

    if (confirmed) {
        await removeTest.mutateAsync(id);
    }
};
