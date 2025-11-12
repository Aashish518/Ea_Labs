import Modal from "../../layout/Modal";
import Button from "../common/Button";

export default function ResourceViewModal({ item, onClose }) {
  if (!item) return null;

  const fileUrl = `${import.meta.env.VITE_BACK_URL}/${item.fileUrl}`;
  const thumbUrl = item.thumbnail
    ? `${import.meta.env.VITE_BACK_URL}/${item.thumbnail}`
    : null;

  return (
    <Modal
      isOpen={!!item}
      onClose={onClose}
      title="View Resource"
      size="lg"
    >
      <div className="space-y-6">
        {/* Thumbnail */}
        {thumbUrl && (
          <div className="flex justify-center">
            <img
              src={thumbUrl}
              alt="Thumbnail"
              className="max-h-48 rounded-md shadow-md object-contain"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Type: <span className="font-medium">{item.type}</span>
          </p>
        </div>

        {/* Description */}
        {item.description && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Description
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        )}

        {/* File Preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            File Preview
          </h3>
          <div className="border rounded-md p-3 bg-gray-50">
            {item.type === "Image" ? (
              <img
                src={fileUrl}
                alt={item.title}
                className="w-full max-h-96 object-contain rounded-md"
              />
            ) : item.type === "Video" ? (
              <video
                src={fileUrl}
                controls
                className="w-full max-h-96 rounded-md"
              />
            ) : item.type === "PDF" ? (
              <iframe
                src={fileUrl}
                className="w-full h-[500px] border rounded-md"
                title="PDF Preview"
              />
            ) : (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Open Article / File
              </a>
            )}
          </div>
        </div>

        {/* Publish Status */}
        <div className="flex justify-between items-center border-t pt-3">
          <p className="text-sm">
            <span className="font-medium">Published:</span>{" "}
            {item.isPublished ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-red-500 font-semibold">No</span>
            )}
          </p>

          <Button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
