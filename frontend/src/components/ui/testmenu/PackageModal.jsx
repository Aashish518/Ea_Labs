import Button from "../common/Button";

const PackageModal = ({ pkg, onClose }) => {
    if (!pkg) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl z-10 animate-slide-down">
                {/* Close Button */}
                <Button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                    onClick={onClose}
                    arialabel="Close modal"
                >
                    ×
                </Button>

                <h3 className="text-2xl font-bold mb-6 text-gray-800">{pkg.name}</h3>

                <div className="mb-6 text-gray-700 space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Price:</span>
                        <span>{pkg.price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Sample Type:</span>
                        <span>{pkg.sampleType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Sample Volume:</span>
                        <span>{pkg.sampleVolume}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Test Method:</span>
                        <span>{pkg.testMethod}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Special Instructions:</span>
                        <span>{pkg.specialInstructions || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Turnaround Time:</span>
                        <span>{pkg.turnaroundTime || "-"}</span>
                    </div>
                    {pkg.details && (
                        <div className="mt-3">
                            <h4 className="font-semibold text-gray-800 mb-1">Details:</h4>
                            <p>{pkg.details}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PackageModal;
