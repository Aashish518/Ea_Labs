import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
    {
        id: 1,
        title: "Harvesting",
        description:
            "Our journey begins in the date palm groves, where ripe dates are carefully handpicked to preserve their natural sweetness and texture.",
        image:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        title: "Cleaning",
        description:
            "Freshly harvested dates are gently cleaned using natural water to remove dust and impurities while retaining their natural shine.",
        image:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        title: "Washing",
        description:
            "Each batch of dates is thoroughly washed and checked to ensure hygiene and purity, following strict quality standards.",
        image:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        title: "Sorting",
        description:
            "Every date is hand and machine-sorted for size, ripeness, and quality, ensuring only the finest make it through.",
        image:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 5,
        title: "Packing",
        description:
            "Once sorted, dates are packed in eco-friendly packaging designed to preserve freshness and flavor.",
        image:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 6,
        title: "Global",
        description:
            "From our farms to your table — our dates are shipped worldwide with care, ensuring premium quality for every customer.",
        image:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
];

const AboutUs = () => {
    const [activeStep, setActiveStep] = useState(3); // default “Sorting”

    return (
        <section className="bg-white py-10 md:py-16">
            <div className="container mx-auto px-4 sm:px-11">
                {/* Top Content Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Left Image */}
                    <div className="w-full md:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={steps[activeStep].image}
                                src={steps[activeStep].image}
                                alt={steps[activeStep].title}
                                className="w-full rounded-xl shadow-md h-full"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.4 }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Right Text */}
                    <div className="w-full md:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={steps[activeStep].id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    {steps[activeStep].title}
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    {steps[activeStep].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Timeline */}
                <div className="relative mt-16 md:mt-20 px-6 md:px-15 mb-15">
                    {/* Line - centered between top & bottom labels */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-300 -translate-y-1/2 z-0"></div>

                    {/* Steps */}
                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex flex-col items-center cursor-pointer group relative"
                                onClick={() => setActiveStep(index)}
                            >
                                {/* Title ABOVE for even indices */}
                                {index % 2 !== 0 && (
                                    <span
                                        className={`text-sm md:text-base font-medium absolute -top-8 text-center whitespace-nowrap ${activeStep === index
                                                ? "text-blue-600"
                                                : "text-gray-500 group-hover:text-blue-300"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                )}

                                {/* Dot */}
                                <div
                                    className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${activeStep === index
                                            ? "bg-blue-200 border-blue-600 scale-110"
                                            : "bg-white border-gray-400 group-hover:border-blue-300"
                                        }`}
                                ></div>

                                {/* Title BELOW for odd indices */}
                                {index % 2 === 0 && (
                                    <span
                                        className={`text-sm md:text-base font-medium absolute top-8 text-center whitespace-nowrap ${activeStep === index
                                                ? "text-blue-600"
                                                : "text-gray-500 group-hover:text-blue-300"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}

export default AboutUs;