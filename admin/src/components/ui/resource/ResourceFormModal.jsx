import { useEffect, useState } from "react";
import Modal from "../../layout/Modal";
import Input from "../common/Input";
import ImageUpload from "../common/ImageUpload";
import Button from "../common/Button";
import Textarea from "../common/Textarea";

const ResourceFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Article"); // Article = PDF
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isPublished, setIsPublished] = useState(true);

  // 🌀 Auto-fill when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setType(initialData.type || "Article");
      setIsPublished(initialData.isPublished ?? true);

      // ✅ Thumbnail preview
      setThumbnailPreview(
        initialData.thumbnail
          ? `${import.meta.env.VITE_BACK_URL}${initialData.thumbnail}`
          : null
      );

      // ✅ File preview
      if (initialData.fileUrl) {
        const baseUrl = import.meta.env.VITE_BACK_URL?.replace(/\/$/, "");
        const filePath = initialData.fileUrl.replace(/^\//, "");
        const previewUrl = `${baseUrl}/${filePath}`;
        setFilePreview(previewUrl);

        // guess mime type for preview
        const ext = initialData.fileUrl.split(".").pop().toLowerCase();
        let mimeType = "";
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
          mimeType = "image/*";
        else if (["mp4", "webm", "mov"].includes(ext))
          mimeType = "video/*";
        else if (ext === "pdf") mimeType = "application/pdf";

        setFile({ name: initialData.fileUrl, type: mimeType });
      } else {
        setFile(null);
        setFilePreview(null);
      }
    } else {
      resetForm();
    }
  }, [initialData]);

  // 🧹 Reset
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("Article");
    setFile(null);
    setThumbnail(null);
    setFilePreview(null);
    setThumbnailPreview(null);
    setIsPublished(true);
  };

  // 📂 File Upload
  const handleFileUpload = (files) => {
    const uploadedFile = files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);

    // Auto-set type if not chosen manually
    if (uploadedFile.type.startsWith("image/")) setType("Image");
    else if (uploadedFile.type.startsWith("video/")) setType("Video");
    else if (uploadedFile.type === "application/pdf") setType("Article");

    setFilePreview(URL.createObjectURL(uploadedFile));
  };

  // 🖼️ Thumbnail Upload
  const handleThumbnailUpload = (files) => {
    const uploadedThumb = files[0];
    setThumbnail(uploadedThumb);
    setThumbnailPreview(URL.createObjectURL(uploadedThumb));
  };

  // 💾 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("isPublished", isPublished);
    if (file) formData.append("file", file);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (initialData?._id) formData.append("_id", initialData._id);

    onSubmit(Object.fromEntries(formData));
    resetForm();
    onClose();
  };

  // Dynamic accepted types for uploader
  const acceptedTypes =
    type === "Image"
      ? "image/*"
      : type === "Video"
      ? "video/*"
      : "application/pdf";

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title={initialData ? "Edit Resource" : "Add New Resource"}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter resource title"
            required
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            rows="3"
          ></Textarea>
        </div>

        {/* Type */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          >
            <option value="Article">Article (PDF)</option>
            <option value="Image">Image</option>
            <option value="Video">Video</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource File <span className="text-red-500">*</span>
          </label>
          <ImageUpload onUpload={handleFileUpload} accept={acceptedTypes} />
          {filePreview && file && (
            <div className="mt-3">
              {file.type.startsWith("image/") ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded border"
                />
              ) : file.type.startsWith("video/") ? (
                <video
                  src={filePreview}
                  controls
                  className="w-64 h-36 rounded border"
                />
              ) : file.type === "application/pdf" ? (
                <iframe
                  src={filePreview}
                  title="PDF Preview"
                  className="w-64 h-64 border rounded"
                  allow="fullscreen"
                ></iframe>
              ) : (
                <p className="text-gray-600 text-sm mt-2">
                  File uploaded or linked
                </p>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail <span className="text-red-500">*</span>
          </label>
          <ImageUpload onUpload={handleThumbnailUpload} accept="image/*" />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-3 w-24 h-24 rounded border"
            />
          )}
        </div>

        {/* Publish */}
        <div className="mt-4 flex items-center gap-2">
          <Input
            id="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="text-sm text-gray-700">
            Publish this resource
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg font-medium bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            {initialData ? "Update" : "Create"} Resource
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ResourceFormModal;
