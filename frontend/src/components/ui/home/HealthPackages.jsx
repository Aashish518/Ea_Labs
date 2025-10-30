import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../Icon";
import Button from "../common/Button";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "../../../store/LocationStore";
import { searchDataAtom } from "../../../store/SearchStore";
import { getCategoriesWithTests } from "../../../api/apis/testapi";

const HealthPackages = ({ handletestdetail, matchdata }) => {
    const [selectedLocation] = useAtom(selectedLocationAtom);
    const [searchData] = useAtom(searchDataAtom);
    const [activeCategory, setActiveCategory] = useState("");

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

    // ✅ Only trigger scroll flag when a true search match happens
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

    return (
        <section className="py-10 bg-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-10">
                    Curated Health Checkup Packages
                </h2>

                <div className="flex gap-2 mb-12 overflow-x-auto whitespace-nowrap md:justify-start pb-3">
                    {isLoading && <span>Loading categories...</span>}
                    {isError && (
                        <span className="text-red-500">Error loading categories</span>
                    )}
                    {filteredCategories.map((cat) => (
                        <Button
                            key={cat.categoryId}
                            onClick={() => setActiveCategory(cat.categoryName)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${activeCategory === cat.categoryName
                                    ? "bg-red-600 text-white"
                                    : "bg-gradient-to-r from-purple-100 to-white text-black border border-[#203270] hover:bg-gray-100"
                                }`}
                        >
                            {cat.categoryName}
                        </Button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCategories
                        .filter((cat) => cat.categoryName === activeCategory)
                        .flatMap((cat) => cat.tests)
                        .map((pkg) => (
                            <div
                                key={pkg._id}
                                className="bg-gradient-to-b from-purple-100 to-white border border-purple-100 rounded-lg shadow-md overflow-hidden flex flex-col"
                            >
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                        <span className="font-semibold text-gray-800">
                                            Includes:
                                        </span>
                                        <span>{pkg.include.join(", ")}</span>
                                    </div>
                                    <div className="flex items-start space-x-2 text-sm text-gray-500 mb-4">
                                        <span className="font-semibold text-gray-800">
                                            For:
                                        </span>
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
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default HealthPackages;
