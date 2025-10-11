import { showSuccess, showError, confirmAction } from "./alertUtils";

export const handleAddCategory = async (data, addCategory, onClose) => {
    try {
        const res = await addCategory.mutateAsync(data);
        showSuccess(res?.message || "Category added successfully!");
    } catch (err) {
        showError(err?.response?.data?.message || "Failed to add category.");
    } finally {
        onClose();
    }
};

export const handleUpdateCategory = async (id, data, updateCategory, onClose) => {
    try {
        const res = await updateCategory.mutateAsync({ id, data });
        showSuccess(res?.message || "Category updated successfully!");
    } catch (err) {
        showError(err?.response?.data?.message || "Failed to update category.");
    } finally {
        onClose();
    }
};

export const handleDeleteCategory = async (catId, tests, removeCategory) => {
    const related = tests.filter((t) => t.category._id === catId);
    const count = related.length;

    const message =
        count > 0
            ? `This category has <b>${count}</b> test${count > 1 ? "s" : ""}.<br>
         <strong>Deleting it will also remove related tests permanently.</strong>`
            : "Are you sure you want to delete this category?";

    const confirmed = await confirmAction({
        title: "Delete Category?",
        message,
        confirmText: "Yes, delete it!",
        successMessage: "Category deleted successfully.",
        important: count > 0,
    });

    if (confirmed) {
        await removeCategory.mutateAsync(catId);
    }
};
