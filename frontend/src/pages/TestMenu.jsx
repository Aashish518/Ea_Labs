import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/ui/common/Button";
import PackageGrid from "../components/ui/testmenu/PackageGrid";
import PackageModal from "../components/ui/testmenu/PackageModal";
import { getAllTestMenus } from "../api/apis/testmenu";

const TestMenu = () => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [activeLetter, setActiveLetter] = useState("A");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [selectedPkg, setSelectedPkg] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["testMenus", currentPage, activeLetter],
        queryFn: () => getAllTestMenus(currentPage, itemsPerPage, activeLetter),
        keepPreviousData: true,
    });

    const handleLetterSelect = (letter) => {
        setActiveLetter(letter);
        setCurrentPage(1); 
    };

    const goToPage = (page) => {
        const totalPages = data?.pagination?.totalPages || 1;
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
    };

    const totalPages = data?.pagination?.totalPages || 1;

    return (
        <section className="py-8 bg-gray-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-10 text-gray-800">Test Menus</h2>

                {/* Alphabet Filter */}
                <div className="flex gap-2 mb-3 md:mb-5 overflow-x-auto scrollbar-hide">
                    {alphabets.map((letter) => (
                        <Button
                            key={letter}
                            onClick={() => handleLetterSelect(letter)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeLetter === letter
                                ? "bg-[#AA1626] text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {letter}
                        </Button>
                    ))}
                </div>

                <hr className="mb-5"/>

                {/* Package Grid */}
                {isLoading ? (
                    <p className="text-center text-indigo-700">Loading...</p>
                ) : isError ? (
                        <p className="text-center text-gray-800">
                            No tests found for "{activeLetter}".
                        </p>
                ) : data?.data.length > 0 ? (
                    <PackageGrid
                        packages={data.data}
                        onSelect={(pkg) => setSelectedPkg(pkg)}
                    />
                ) : (
                    <p className="text-center text-gray-500">
                        No tests found for "{activeLetter}".
                    </p>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3">
                        <Button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Prev
                        </Button>

                        <span className="px-4 text-gray-600 font-medium text-sm">
                            {currentPage} of {totalPages}
                        </span>

                        <Button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedPkg && (
                <PackageModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
            )}
        </section>
    );
};

export default TestMenu;
