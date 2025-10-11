import { useState } from "react";
import CategoryTabs from "../components/ui/testmenu/CategoryTabs";
import PackageGrid from "../components/ui/testmenu/PackageGrid";
import Button from "../components/ui/common/Button";
import PackageModal from "../components/ui/testmenu/PackageModal";

const TestMenu = () => {
    const categories = ["Heart", "Liver", "Vitamins", "Diabetes", "Thyroid", "Allergy"];
    const [activeCategory, setActiveCategory] = useState("Thyroid");

    const packages = Array.from({ length: 40 }).map((_, i) => ({
        name: `Anti GBM Antibody ${i + 1}`,
        sampleType: "Serum (Red top)",
        sampleVolume: "1.0 mL",
        testMethod: "Elisa",
        details:
            "Full details about the test, procedure, preparation, and instructions go here. This test is used to detect antibodies against the glomerular basement membrane.",
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(packages.length / itemsPerPage);

    const paginatedPackages = packages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [selectedPackage, setSelectedPackage] = useState(null);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-left mb-10 text-gray-800">
                    Test By Alphabets
                </h2>

                {/* Categories */}
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />

                {/* Package Grid */}
                <PackageGrid packages={paginatedPackages} onSelect={setSelectedPackage} />

                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    <Button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        Prev
                    </Button>

                    <span className="px-4 py-2 text-gray-600 font-medium text-sm">
                        {currentPage} of {totalPages}
                    </span>

                    <Button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
        </section>
    );
};

export default TestMenu;
