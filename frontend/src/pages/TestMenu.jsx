import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/common/Button";
import PackageGrid from "../components/ui/testmenu/PackageGrid";
import PackageModal from "../components/ui/testmenu/PackageModal";
import { getAllTestMenus } from "../api/apis/testmenu";
import Loading from "../components/Loading";

const TestMenu = () => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [activeLetter, setActiveLetter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [selectedPkg, setSelectedPkg] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["testMenus", currentPage, activeLetter],
        queryFn: () => getAllTestMenus(currentPage, itemsPerPage, activeLetter),
        keepPreviousData: true,
    });

    useEffect(() => {
        if (!activeLetter && data?.availableLetters?.length > 0) {
            setActiveLetter(data.availableLetters[0]);
        }
    }, [data, activeLetter]);

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
    const availableLetters = new Set(data?.availableLetters || [activeLetter]);

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
                            disabled={!availableLetters.has(letter)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                activeLetter === letter
                                    ? "bg-[#AA1626] text-white"
                                    : !availableLetters.has(letter)
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {letter}
                        </Button>
                    ))}
                </div>

                <hr className="mb-5" />

                {/* Package Grid */}
                {isLoading ? (
                    <Loading message="Loading TestMenu" />
                ) : isError ? (
                    <p className="text-center text-gray-800">
                        No tests found for "{activeLetter}".
                    </p>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLetter + currentPage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {data?.data?.length > 0 ? (
                                <PackageGrid
                                    packages={data.data}
                                    onSelect={(pkg) => setSelectedPkg(pkg)}
                                />
                            ) : (
                                <p className="text-center text-gray-500">
                                    No tests found for "{activeLetter}".
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-6">
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
