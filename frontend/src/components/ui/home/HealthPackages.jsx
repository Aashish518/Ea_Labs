import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../Icon";
import Button from "../common/Button";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "../../../store/LocationStore";
import { searchDataAtom } from "../../../store/SearchStore";
import { getCategoriesWithTests } from "../../../api/apis/testapi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../common/Image";

const HealthPackages = ({ handletestdetail, matchdata }) => {
  const [selectedLocation] = useAtom(selectedLocationAtom);
  const [searchData] = useAtom(searchDataAtom);
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const { data: categoriesData = [], isLoading, isError } = useQuery({
    queryKey: ["categoriesWithTests", selectedLocation?.locationName],
    queryFn: () => getCategoriesWithTests(selectedLocation.locationName),
    enabled: !!selectedLocation,
  });

  useEffect(() => {
    if (categoriesData.length > 0) {
      setActiveCategory(categoriesData[0].categoryName);
    }
  }, [categoriesData]);

  const filteredCategories = useMemo(() => {
    if (!searchData || searchData.trim() === "") return categoriesData;
    const query = searchData.toLowerCase();
    const matchedCategories = categoriesData
      .map((cat) => {
        const isCategoryMatch = cat.categoryName.toLowerCase() === query;
        const matchedTests = cat.tests.filter(
          (test) =>
            test.name.toLowerCase() === query ||
            test.description?.toLowerCase() === query
        );
        if (isCategoryMatch || matchedTests.length > 0) {
          return {
            ...cat,
            tests: isCategoryMatch ? cat.tests : matchedTests,
          };
        }
        return null;
      })
      .filter(Boolean);
    return matchedCategories.length > 0 ? matchedCategories : categoriesData;
  }, [categoriesData, searchData]);

  useEffect(() => {
    if (searchData && searchData.trim() !== "") {
      const query = searchData.toLowerCase();
      const isMatched = categoriesData.some(
        (cat) =>
          cat.categoryName.toLowerCase() === query ||
          cat.tests.some(
            (test) =>
              test.name.toLowerCase() === query ||
              test.description?.toLowerCase() === query
          )
      );
      matchdata(isMatched);
    } else {
      matchdata(false);
    }
  }, [searchData, categoriesData, matchdata]);

  const activeTests =
    filteredCategories.find((cat) => cat.categoryName === activeCategory)
      ?.tests || [];

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  const totalPages = Math.ceil(activeTests.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleTests = activeTests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <motion.section
      className="py-10 bg-purple-50"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-10">
          Curated Health Checkup Packages
        </h2>

        {/* ✅ Category Buttons */}
        <motion.div
          className="flex overflow-x-auto whitespace-nowrap space-x-3 sm:mb-15 pb-3 mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          {filteredCategories.map((cat) => (
            <div key={cat.categoryId} className="inline-block shrink-0">
              <Button
                onClick={() => setActiveCategory(cat.categoryName)}
                className={`flex items-center rounded-full overflow-visible transition border border-[#203270]
                  ${
                    activeCategory === cat.categoryName
                      ? "bg-red-600 text-white"
                      : "bg-linear-to-r from-white to-white text-black hover:bg-gray-100"
                  }`}
              >
                <div className="bg-white p-1 rounded-full flex items-center justify-center shrink-0">
                  {cat.image && (
                    <Image
                      src={`${import.meta.env.VITE_BACK_URL}/uploads/${cat.image}`}
                      alt={cat.categoryName}
                      className="h-8 w-8 lg:w-12 lg:h-12 rounded-full object-cover"
                    />
                  )}
                </div>

                <span
                  className={`px-4 py-2 font-semibold sm:text-lg ${
                    activeCategory === cat.categoryName
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {cat.categoryName}
                </span>
              </Button>
            </div>
          ))}
        </motion.div>

        {/* ✅ Test Cards with smooth animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleTests.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                className="bg-linear-to-b from-purple-100 to-white border border-purple-100 rounded-lg shadow-md overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="p-6 grow">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <span className="font-semibold text-gray-800">
                      Includes:
                    </span>
                    <span>{pkg.include.join(", ")}</span>
                  </div>

                  <div className="flex items-start space-x-2 text-sm text-gray-500 mb-4">
                    <span className="font-semibold text-gray-800">For:</span>
                    <span>{pkg.for.join(", ")}</span>
                  </div>

                  <hr />

                  <p className="text-sm mt-4 text-gray-500 mb-4">
                    Reports in{" "}
                    <span className="font-bold text-gray-800">
                      {pkg.reportInTime} hours
                    </span>
                  </p>

                  <div className="flex justify-start items-center">
                    <Button
                      onClick={() => handletestdetail(pkg._id)}
                      className="text-red-600 font-bold flex items-center space-x-2 hover:underline"
                    >
                      <span>See Details</span>
                      <div className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <Icon path="M9 5l7 7-7 7" className="w-3 h-3" />
                      </div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center mt-8 space-x-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className={`rounded-full px-4 py-2 border ${
                currentPage === 0
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-red-600 border-red-600 hover:bg-red-50"
              }`}
            >
              Prev
            </Button>

            <span className="text-gray-600 font-medium">
              {currentPage + 1} / {totalPages}
            </span>

            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className={`rounded-full px-4 py-2 border ${
                currentPage === totalPages - 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-red-600 border-red-600 hover:bg-red-50"
              }`}
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default HealthPackages;
