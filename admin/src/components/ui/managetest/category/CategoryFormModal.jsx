import { useEffect, useState } from "react";
import Modal from "../../../layout/Modal";
import Input from "../../common/Input";
import Button from "../../common/Button";
import ImageUpload from "../../common/ImageUpload";
import Image from "../../common/Image";

// Category Form Modal
const CategoryFormModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [categoryName, setCategoryName] = useState(editData?.categoryName || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(editData?.image ? `${import.meta.env.VITE_BACK_URL}/uploads/${editData.image}` : null);

    useEffect(() => {
        setCategoryName(editData?.categoryName || "");
        setPreview(editData?.image ? `${import.meta.env.VITE_BACK_URL}/uploads/${editData.image}` : null);
    }, [editData]);

    const handleUpload = (files) => {
        const file = files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("categoryName", categoryName);
        if (image) formData.append("image", image);
        onSubmit(formData);

        // Reset
        setCategoryName("");
        setImage(null);
        setPreview(null);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? "Edit Category" : "Add New Category"}
            size="sm"
        >
            <form onSubmit={handleSubmit}>
                {/* Category Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        label="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        required
                    />
                </div>

                {/* ✅ Image Upload (Drag-and-Drop) */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category Image
                    </label>

                    <ImageUpload onUpload={handleUpload} />

                    {preview && (
                        <Image
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-24 h-24 rounded border"
                        />
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg font-medium bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {editData ? "Update" : "Create"} Category
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CategoryFormModal;
