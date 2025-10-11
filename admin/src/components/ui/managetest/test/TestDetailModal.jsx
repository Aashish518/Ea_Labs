import Modal from "../../../layout/Modal";

const TestDetailModal = ({ isOpen, onClose, test }) => {
    if (!test) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Test Details">
            <div className="space-y-4 text-gray-700">

                {/* Name */}
                <div>
                    <strong className="block text-sm text-gray-500">Name</strong>
                    <p>{test.name}</p>
                </div>

                {/* Description */}
                {test.description && (
                    <div>
                        <strong className="block text-sm text-gray-500">Description</strong>
                        <p>{test.description}</p>
                    </div>
                )}

                {/* Include */}
                {test.include?.length > 0 && (
                    <div>
                        <strong className="block text-sm text-gray-500">Includes</strong>
                        <ul className="list-disc pl-5">
                            {test.include.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* For */}
                {test.for?.length > 0 && (
                    <div>
                        <strong className="block text-sm text-gray-500">For</strong>
                        <ul className="list-disc pl-5">
                            {test.for.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Report In Time */}
                {test.reportInTime && (
                    <div>
                        <strong className="block text-sm text-gray-500">Report In Time</strong>
                        <p>{test.reportInTime} hrs</p>
                    </div>
                )}

                {/* Overview */}
                {test.overview && (
                    <div>
                        <strong className="block text-sm text-gray-500">Overview</strong>
                        <p>{test.overview}</p>
                    </div>
                )}

                {/* Test Components */}
                {test.testComponent?.length > 0 && (
                    <div>
                        <strong className="block text-sm text-gray-500">Test Components</strong>
                        <ul className="list-disc pl-5">
                            {test.testComponent.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Prerequisites */}
                {test.prerequisites?.length > 0 && (
                    <div>
                        <strong className="block text-sm text-gray-500">Prerequisites</strong>
                        <ul className="list-disc pl-5">
                            {test.prerequisites.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* FAQs */}
                {test.faqs?.length > 0 && (
                    <div>
                        <strong className="block text-sm text-gray-500">FAQs</strong>
                        <ul className="list-disc pl-5">
                            {test.faqs.map((faq, idx) => (
                                <li key={idx}>
                                    <p><strong>Q:</strong> {faq.question}</p>
                                    <p><strong>A:</strong> {faq.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Price */}
                <div>
                    <strong className="block text-sm text-gray-500">Price</strong>
                    <p>₹ {test.price}</p>
                </div>

                {/* Category */}
                {test.category && (
                    <div>
                        <strong className="block text-sm text-gray-500">Category</strong>
                        <p>{test.category.categoryName}</p>
                    </div>
                )}

                {/* Locations */}
                {test.locations?.length > 0 && (
                    <div>
                        <strong className="block text-sm text-gray-500">Locations</strong>
                        <ul className="list-disc pl-5">
                            {test.locations.map((loc, idx) => (
                                <li key={idx}>{loc.locationName}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Created At */}
                <div>
                    <strong className="block text-sm text-gray-500">Created At</strong>
                    <p>{new Date(test.createdAt).toLocaleString()}</p>
                </div>

            </div>
        </Modal>
    );
};

export default TestDetailModal;
