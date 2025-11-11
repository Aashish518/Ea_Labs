import Modal from "../../layout/Modal";

const CategoryDetailsModal = ({ isOpen, onClose, category, testsData = [] }) => {
    if (!category) return null;

    // Map test IDs to full test objects
    const categoryTests = category.tests
        ?.map((testId) => testsData.find((t) => t._id === testId))
        .filter(Boolean) || [];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Category Details" size="xl">
            <div className="p-8 space-y-8">

                <div className="flex gap-6 items-start border-b border-gray-200 pb-6">
                    {/* Category Image */}
                    {category.image && (
                        <div className="flex-shrink-0">
                            <img
                                src={`${import.meta.env.VITE_BACK_URL}${category.image}`}
                                alt={category.name}
                                className="w-24 h-24 object-cover border border-gray-300"
                            />
                        </div>
                    )}

                    {/* Category Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-light text-gray-900 mb-6">{category.name}</h1>

                        <div className="flex gap-8 text-sm">
                            <div>
                                <span className="text-gray-500">Price</span>
                                <p className="text-xl font-light mt-1">₹{category.price}</p>
                            </div>

                            <div>
                                <span className="text-gray-500">Status</span>
                                <p className="text-xl font-light mt-1">
                                    {category.enable ? "Active" : "Inactive"}
                                </p>
                            </div>

                            <div>
                                <span className="text-gray-500">Total Tests</span>
                                <p className="text-xl font-light mt-1">{categoryTests.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tests Section */}
                <div>
                    <p className="text-sm text-gray-500 mb-4">
                        Included Tests ({categoryTests.length})
                    </p>

                    {categoryTests.length > 0 ? (
                        <div className="space-y-2">
                            {categoryTests.map((t, index) => (
                                <div
                                    key={t._id}
                                    className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                                >
                                    <span className="text-gray-400 text-sm min-w-[24px]">
                                        {index + 1}.
                                    </span>
                                    <p className="text-gray-700 text-sm">{t.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm py-8 text-center">
                            No tests available in this category
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default CategoryDetailsModal;