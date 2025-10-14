import Modal from "../../../layout/Modal";
import { X } from "lucide-react";

const TestDetailModal = ({ isOpen, onClose, test }) => {
    if (!test) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Test Details" size="xl">
            <div className="p-8 space-y-8">

                <div>
                    <h1 className="text-3xl font-light text-gray-900 mb-2">{test.name}</h1>
                    {test.category && (
                        <p className="text-sm text-gray-500">{test.category.categoryName}</p>
                    )}
                </div>

                <div className="flex gap-8 text-sm border-t border-b border-gray-200 py-4">
                    <div>
                        <span className="text-gray-500">Price</span>
                        <p className="text-xl font-light mt-1">₹{test.price}</p>
                    </div>
                    {test.reportInTime && (
                        <div>
                            <span className="text-gray-500">Report</span>
                            <p className="text-xl font-light mt-1">{test.reportInTime} hrs</p>
                        </div>
                    )}
                </div>

                {test.description && (
                    <div>
                        <p className="text-gray-700 leading-relaxed">{test.description}</p>
                    </div>
                )}

                {test.overview && (
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Overview</p>
                        <p className="text-gray-700 leading-relaxed">{test.overview}</p>
                    </div>
                )}

                {test.include?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Includes</p>
                        <div className="space-y-2">
                            {test.include.map((item, idx) => (
                                <p key={idx} className="text-gray-700 text-sm">• {item}</p>
                            ))}
                        </div>
                    </div>
                )}

                {test.for?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500 mb-3">For</p>
                        <div className="space-y-2">
                            {test.for.map((item, idx) => (
                                <p key={idx} className="text-gray-700 text-sm">• {item}</p>
                            ))}
                        </div>
                    </div>
                )}

                {test.testComponent?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Components</p>
                        <div className="space-y-2">
                            {test.testComponent.map((item, idx) => (
                                <p key={idx} className="text-gray-700 text-sm">• {item}</p>
                            ))}
                        </div>
                    </div>
                )}

                {test.prerequisites?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Prerequisites</p>
                        <div className="space-y-2">
                            {test.prerequisites.map((item, idx) => (
                                <p key={idx} className="text-gray-700 text-sm">• {item}</p>
                            ))}
                        </div>
                    </div>
                )}

                {test.faqs?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500 mb-4">Questions</p>
                        <div className="space-y-6">
                            {test.faqs.map((faq, idx) => (
                                <div key={idx}>
                                    <p className="text-gray-900 mb-2">{faq.question}</p>
                                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {test.locations?.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Locations</p>
                        <div className="space-y-1">
                            {test.locations.map((loc, idx) => (
                                <p key={idx} className="text-gray-700 text-sm">{loc.locationName}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-xs text-gray-400 pt-4">
                    {new Date(test.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default TestDetailModal;