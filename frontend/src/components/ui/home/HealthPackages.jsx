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

    console.log(filteredCategories, "hhhh")
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

                {/* ✅ Category Buttons with Images */}
                <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar space-x-3 pb-15">
                    {filteredCategories.map((cat) => (
                        <div
                            key={cat.categoryId}
                            className="inline-block shrink-0" // prevents items from shrinking on mobile
                        >
                            <Button
                                onClick={() => setActiveCategory(cat.categoryName)}
                                className={`flex items-center rounded-full overflow-visible transition border border-[#203270]
          ${activeCategory === cat.categoryName
                                        ? "bg-red-600 text-white"
                                        : "bg-linear-to-r from-white to-white text-black hover:bg-gray-100"
                                    }`}
                            >
                                {/* Image box */}
                                <div className="bg-white p-1 rounded-full flex items-center justify-center shrink-0">
                                    {cat.image && (
                                        <img
                                            src={`${import.meta.env.VITE_BACK_URL}/uploads/${cat.image}`}
                                            alt={cat.categoryName}
                                            className="h-8 w-8 sm:w-12 sm:h-12 rounded-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Text area */}
                                <span
                                    className={`px-4 py-2 font-semibold sm:text-lg ${activeCategory === cat.categoryName ? "text-white" : "text-black"
                                        }`}
                                >
                                    {cat.categoryName}
                                </span>
                            </Button>
                        </div>
                    ))}
                </div>




                {/* ✅ Test Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCategories
                        .filter((cat) => cat.categoryName === activeCategory)
                        .flatMap((cat) => cat.tests)
                        .map((pkg) => (
                            <div
                                key={pkg._id}
                                className="bg-linear-to-b from-purple-100 to-white border border-purple-100 rounded-lg shadow-md overflow-hidden flex flex-col"
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
