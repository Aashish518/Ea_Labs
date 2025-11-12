import React, { useState, useEffect } from 'react';
import Modal from '../../layout/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import ImageUpload from '../common/ImageUpload';
import Image from '../common/Image';

const AboutUsFormModal = ({ selectedItem, onClose, onSave }) => {
  const [update,setUpdate]=useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null,
    imagePreview: '',
  });

  // Prefill form when editing
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title || '',
        description: selectedItem.description || '',
        imageFile: null,
        imagePreview: selectedItem.image || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        imageFile: null,
        imagePreview: '',
      });
    }
  }, [selectedItem]);

  // Handle text input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file
  const handleImageUpload = (files) => {
    setUpdate(true);
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewURL,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.imageFile && !formData.imagePreview) {
      alert('Image is required');
      return;
    }

    onSave({
      title: formData.title,
      description: formData.description,
      image: formData.imageFile,
      _id: selectedItem?._id || undefined,
    });
  };

  const getImageSrc = () => {
    if (!update) {
      return `${import.meta.env.VITE_BACK_URL}/${formData.imagePreview}`;
    }
    else {
      return formData.imagePreview; 
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={selectedItem ? 'Edit About Us Content' : 'Add New About Us Content'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            required
          />
        </div>

        {/* Description */}
        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Enter description"
          required
          rows={5}
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <ImageUpload onUpload={handleImageUpload} />
          {formData.imagePreview && (
            <Image
              src={getImageSrc()}
              alt="Preview"
              className="mt-4 w-full h-60 rounded-lg border shadow-sm"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            {selectedItem ? 'Update Content' : 'Add Content'}
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AboutUsFormModal;
