import React from "react";
import Modal from "../../layout/Modal";
import Image from "../common/Image";

const AboutUsViewModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="About Us Details"
      size="lg"
    >
      <div className="space-y-6 p-6">
        {/* Image */}
        {item.image && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src={`${import.meta.env.VITE_BACK_URL}/${item.image}`}
              alt={item.title}
              className="w-full h-80"
            />
          </div>
        )}

        {/* Title */}
        <div className="border-b border-gray-100 pb-4">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">
            Title
          </label>
          <h2 className="text-2xl font-semibold text-gray-900">
            {item.title}
          </h2>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-3">
            Description
          </label>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AboutUsViewModal;