import Button from "../common/Button";

const PackageModal = ({ pkg, onClose }) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="
          relative bg-white rounded-xl 
          w-full max-w-lg 
          p-5 sm:p-8 shadow-2xl z-10 animate-slide-down
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* Close Button */}
        <Button
          className="
            absolute top-3 right-3 
            text-gray-400 hover:text-gray-600 
            text-2xl font-bold 
            w-9 h-9 flex items-center justify-center 
            rounded-full hover:bg-gray-100 transition-all
          "
          onClick={onClose}
          arialabel="Close modal"
        >
          ×
        </Button>

        {/* Header */}
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 wrap-break-word">
          {pkg.name}
        </h3>

        {/* Details Block */}
        <div className="mb-6 text-gray-700 space-y-3 bg-gray-50 p-4 rounded-lg">

          {/* Price */}
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="font-semibold text-gray-800">Price:</span>
            <span>{pkg.price}</span>
          </div>

          {/* Sample Type */}
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="font-semibold text-gray-800">Sample Type:</span>
            <span>{pkg.sampleType}</span>
          </div>

          {/* Sample Volume */}
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="font-semibold text-gray-800">Sample Volume:</span>
            <span>{pkg.sampleVolume}</span>
          </div>

          {/* Test Method */}
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="font-semibold text-gray-800">Test Method:</span>
            <span>{pkg.testMethod}</span>
          </div>

          {/* Special Instructions */}
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="font-semibold text-gray-800">Special Instructions:</span>
            <span>{pkg.specialInstructions || "-"}</span>
          </div>

          {/* Turnaround Time */}
          <div className="flex flex-col sm:flex-row justify-between gap-1">
            <span className="font-semibold text-gray-800">Turnaround Time:</span>
            <span>{pkg.turnaroundTime || "-"}</span>
          </div>

          {/* Additional Details */}
          {pkg.details && (
            <div className="mt-3">
              <h4 className="font-semibold text-gray-800 mb-1">Details:</h4>
              <p className="wrap-break-word">{pkg.details}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
