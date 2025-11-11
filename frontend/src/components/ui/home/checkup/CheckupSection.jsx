import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { motion } from "framer-motion"; // 👈 Added
import { searchDataAtom } from "../../../../store/SearchStore";
import CheckupCard from "./CheckupCard";
import { getAllTestPackages } from "../../../../api/apis/packagecategory";

const CheckupSection = ({ title, matchdata }) => {
    const navigate = useNavigate();
    const [searchData] = useAtom(searchDataAtom);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["testPackages"],
        queryFn: getAllTestPackages,
    });

    const checkups = data || [];

    // ✅ Exact name match (case-insensitive)
    const filteredCheckups = useMemo(() => {
        if (!searchData || searchData.trim() === "") return checkups;

        const query = searchData.toLowerCase();
        const matched = checkups.filter(
            (item) => item.name.toLowerCase() === query
        );

        // ✅ If no exact match, show all
        return matched.length > 0 ? matched : checkups;
    }, [checkups, searchData]);

    // ✅ Trigger match only when real match found
    useEffect(() => {
        if (searchData && searchData.trim() !== "") {
            const isMatched = checkups.some(
                (item) => item.name.toLowerCase() === searchData.toLowerCase()
            );
            matchdata(isMatched);
        } else {
            matchdata(false);
        }
    }, [searchData, checkups, matchdata]);

    const handleCardClick = (id) => {
        navigate(`/packagetestdetail/${id}`);
    };

    if (isLoading) return <p className="text-center text-indigo-700">Loading...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load data</p>;

    return (
        <motion.div
            className="w-full mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <h2 className="text-xl lg:text-2xl font-bold text-indigo-900 mb-6 text-center">
                {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 md:gap-6 px-10 sm:px-1">
                {filteredCheckups.length > 0 ? (
                    filteredCheckups.map((checkup, index) => (
                        <motion.div
                            key={checkup._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CheckupCard
                                imageUrl={`http://localhost:7000${checkup.image}`}
                                title={checkup.name}
                                Price={`₹${checkup.price}`}
                                onClick={() => handleCardClick(checkup._id)}
                            />
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-full">
                        No test packages found.
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default CheckupSection;
