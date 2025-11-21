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

    // ⭐ Auto scroll to top when page changes or alphabet changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage, activeLetter]);

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
                    <motion.div
                        className="flex justify-center items-center mt-8 space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {/* Prev */}
                        <Button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`rounded-full px-5 py-2 border transition-all ${
                                currentPage === 1
                                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                    : "text-red-600 border-red-600 hover:bg-red-50"
                            }`}
                        >
                            Prev
                        </Button>

                        {/* Page Count */}
                        <span className="text-gray-600 font-medium text-sm">
                            {currentPage} / {totalPages}
                        </span>

                        {/* Next */}
                        <Button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`rounded-full px-5 py-2 border transition-all ${
                                currentPage === totalPages
                                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                    : "text-red-600 border-red-600 hover:bg-red-50"
                            }`}
                        >
                            Next
                        </Button>
                    </motion.div>
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
