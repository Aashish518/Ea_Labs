import { useState } from "react";
import Icon from "../components/Icon";
import Button from "../components/ui/common/Button";


const TestMenu = () => {
    const categories = ["Heart", "Liver", "Vitamins", "Diabetes", "Thyroid", "Allergy"];
    const [activeCategory, setActiveCategory] = useState("Thyroid");

    const packages = Array.from({ length: 40 }).map((_, i) => ({
        name: `Anti GBM Antibody ${i + 1}`,
        sampleType: "Serum (Red top)",
        sampleVolume: "1.0 mL",
        testMethod: "Elisa",
        details: "Full details about the test, procedure, preparation, and instructions go here. This test is used to detect antibodies against the glomerular basement membrane."
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(packages.length / itemsPerPage);

    const paginatedPackages = packages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Modal state
    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-left mb-10 text-gray-800">Test By Alphabets</h2>

                {/* Categories */}
                <div className="flex gap-2 mb-12 overflow-x-auto whitespace-nowrap md:justify-start pb-2">
                    {categories.map(category => (
                        <Button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === category
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Packages */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-15">
                    {paginatedPackages.map((pkg, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                            <div className="p-5 flex-grow w-full">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{pkg.name}</h3>
                                <div className="mb-4 text-gray-600 text-sm space-y-1">
                                    <p><span className="font-semibold text-gray-700">Sample Type:</span> {pkg.sampleType}</p>
                                    <p><span className="font-semibold text-gray-700">Sample Volume:</span> {pkg.sampleVolume}</p>
                                    <p><span className="font-semibold text-gray-700">Test Method:</span> {pkg.testMethod}</p>
                                </div>
                                <Button
                                    onClick={() => setSelectedPackage(pkg)}
                                    className="text-sm text-red-600 font-bold flex items-center space-x-2 hover:underline"
                                >
                                    <span>See Details</span>
                                    <div className="bg-red-600 text-white rounded-full flex items-center justify-center">
                                        <Icon path="M9 5l7 7-7 7" className="w-3 h-3" />
                                    </div>
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    <Button
                        onClick={() => goToPage(currentPage - 1)}
                        className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        disabled={currentPage === 1}
                    >
                        Prev
                    </Button>

                    <span className="px-4 py-2 text-gray-600 font-medium text-sm">
                        {currentPage} of {totalPages}
                    </span>

                    <Button
                        onClick={() => goToPage(currentPage + 1)}
                        className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Modal */}
            {selectedPackage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setSelectedPackage(null)}
                    ></div>

                    {/* Modal */}
                    <div className="relative bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl z-10 animate-slide-down">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                            onClick={() => setSelectedPackage(null)}
                            aria-label="Close modal"
                        >
                            ×
                        </button>

                        <h3 className="text-2xl font-bold mb-6 text-gray-800 pr-8">{selectedPackage.name}</h3>

                        <div className="mb-6 text-gray-700 space-y-3 bg-gray-50 p-4 rounded-lg">
                            <div className="flex">
                                <span className="font-semibold text-gray-800 min-w-32">Sample Type:</span>
                                <span>{selectedPackage.sampleType}</span>
                            </div>
                            <div className="flex">
                                <span className="font-semibold text-gray-800 min-w-32">Sample Volume:</span>
                                <span>{selectedPackage.sampleVolume}</span>
                            </div>
                            <div className="flex">
                                <span className="font-semibold text-gray-800 min-w-32">Test Method:</span>
                                <span>{selectedPackage.testMethod}</span>
                            </div>
                        </div>

                        <div className="text-gray-700 leading-relaxed">
                            <h4 className="font-semibold text-gray-800 mb-2">Details:</h4>
                            <p>{selectedPackage.details}</p>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default TestMenu;