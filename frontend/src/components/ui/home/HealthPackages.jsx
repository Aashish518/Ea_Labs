import { useState } from "react";
import Icon from "../../Icon";
import Button from "../common/Button";

// Health Packages Component
const HealthPackages = ({ handletestdetail }) => {
    const categories = ["Heart", "Liver", "Vitamins", "Diabetes", "Thyroid", "Allergy"];
    const [activeCategory, setActiveCategory] = useState("Thyroid");

    const packages = [
        { name: "Thyroid Basic (TSH)", description: "Quick check of thyroid-stimulating hormone for dose follow-up.", price: "599/-" },
        { name: "Thyroid Basic (TSH)", description: "Quick check of thyroid-stimulating hormone for dose follow-up.", price: "599/-" },
        { name: "Thyroid Basic (TSH)", description: "Quick check of thyroid-stimulating hormone for dose follow-up.", price: "599/-" },
    ];

    return (
        <section className="py-10 bg-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-10">Curated Health Checkup Packages</h2>
                <div className="flex gap-2 mb-12 overflow-x-auto whitespace-nowrap md:justify-start pb-3">
                    {categories.map(category => (
                        <Button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${activeCategory === category
                                ? 'bg-red-600 text-white'
                                : 'bg-gradient-to-r from-purple-100 to-white text-black border border-[#203270] hover:bg-gray-100'
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div key={index} className="bg-gradient-to-b from-purple-100 to-white border border-purple-100 rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                                <p className="text-gray-600 mb-4">{pkg.description}</p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                    <span className="font-semibold text-gray-800">Includes:</span>
                                    <span>TSH</span>
                                </div>
                                <div className="flex items-start space-x-2 text-sm text-gray-500 mb-4">
                                    <span className="font-semibold text-gray-800">For:</span>
                                    <span>Routine monitoring, Dosage adjustment</span>
                                </div>
                                <hr/>
                                <p className="text-sm mt-4 text-gray-500 mb-4">Reports in <span className="font-bold text-gray-800">18 hours</span></p>
                                <div className="flex justify-start items-center">
                                    <Button
                                        onClick={() => handletestdetail(index)}
                                        className="text-red-600 font-bold flex items-center space-x-2 hover:underline">
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