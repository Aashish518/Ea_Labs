import Modal from "../../layout/Modal";

export default function TestMenuViewModal({ isOpen, onClose, test }) {
    if (!test) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={test.name}
            size="lg"
        >
            <div className="space-y-6 p-2">
                {/* Test Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-500">Sample Type</p>
                        <p className="text-sm text-gray-800">{test.sampleType}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-500">Sample Volume</p>
                        <p className="text-sm text-gray-800">{test.sampleVolume}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-500">Test Method</p>
                        <p className="text-sm text-gray-800">{test.testMethod}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-500">Turnaround Time</p>
                        <p className="text-sm text-gray-800">{test.turnaroundTime}</p>
                    </div>
                </div>

                {/* Special Instructions */}
                <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Special Instructions</h3>
                    <p className="text-sm text-gray-700">{test.specialInstructions || 'No special instructions'}</p>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Price</h3>
                    <p className="text-lg font-bold text-gray-800">₹{test.price}</p>
                </div>
            </div>
        </Modal>
    );
}
