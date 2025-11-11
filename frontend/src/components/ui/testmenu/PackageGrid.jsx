import { motion } from "framer-motion";
import Icon from "../../Icon";
import Button from "../common/Button";

// Animation variants for parent (grid) and each card
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // delay between each card
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const PackageGrid = ({ packages, onSelect }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-15"
        >
            {packages.map((pkg, index) => (
                <motion.div
                    key={index}
                    variants={cardVariants}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                    <div className="p-5 flex-grow w-full">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">
                            {pkg.name}
                        </h3>
                        <hr className="mb-2" />
                        <div className="mb-4 text-gray-600 text-sm space-y-1">
                            <p>
                                <span className="font-semibold text-gray-700">
                                    Sample Type:
                                </span>{" "}
                                {pkg.sampleType}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">
                                    Sample Volume:
                                </span>{" "}
                                {pkg.sampleVolume}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">
                                    Test Method:
                                </span>{" "}
                                {pkg.testMethod}
                            </p>
                        </div>
                        <Button
                            onClick={() => onSelect(pkg)}
                            className="text-sm text-red-600 font-bold flex items-center space-x-2 hover:underline"
                        >
                            <span>See Details</span>
                            <div className="bg-red-600 text-white rounded-full flex items-center justify-center">
                                <Icon path="M9 5l7 7-7 7" className="w-3 h-3" />
                            </div>
                        </Button>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default PackageGrid;
