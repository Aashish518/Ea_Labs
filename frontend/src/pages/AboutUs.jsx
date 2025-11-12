import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAllAboutUs } from "../api/apis/aboutUs";

const AboutUs = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["aboutus"],
        queryFn: getAllAboutUs,
    });

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setSteps(data);
        }
    }, [data]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center py-20 text-lg text-gray-500">
                Loading About Us...
            </div>
        );

    if (isError)
        return (
            <div className="flex justify-center items-center py-20 text-red-500">
                Failed to load About Us.
            </div>
        );

    if (!steps.length)
        return (
            <div className="flex justify-center items-center py-20 text-gray-500">
                No About Us data found.
            </div>
        );

    return (
        <section className="bg-gray-50 py-10 md:py-16">
            <div className="container mx-auto px-4 sm:px-11">
                {/* Top Content Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:px-20">
                    {/* Left Image */}
                    <div className="w-full md:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={steps[activeStep]?.image}
                                src={`${import.meta.env.VITE_BACK_URL}/${steps[activeStep]?.image}`}
                                alt={steps[activeStep]?.title}
                                className="w-auto h-auto sm:h-120 sm:w-200 rounded-xl shadow-md"
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.4 }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Right Text */}
                    <div className="w-full md:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={steps[activeStep]?.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    {steps[activeStep]?.title}
                                </h2>
                                <p
                                    className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose 
             break-words whitespace-pre-line max-w-3xl w-full mx-auto text-left md:text-lef"
                                >
                                    {steps[activeStep]?.description}
                                </p>

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Timeline */}
                <div className="relative mt-12 md:mt-8 mb-15">
                    {/* Scrollable container for mobile */}
                    <div className="overflow-x-auto md:overflow-visible md:px-15">
                        <div className="relative min-w-max md:min-w-0 py-12">
                            {/* Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 -translate-y-1/2 z-0"></div>

                            {/* Steps */}
                            <div className="flex gap-16 md:justify-between relative z-10 px-4">
                                {steps.map((step, index) => (
                                    <div
                                        key={step._id}
                                        className="flex flex-col items-center cursor-pointer group relative shrink-0 min-w-[80px]"
                                        onClick={() => setActiveStep(index)}
                                    >
                                        {/* Title ABOVE for odd indices */}
                                        {index % 2 !== 0 && (
                                            <span
                                                className={`text-xl md:text-base font-medium absolute -top-10 md:-top-8 text-center whitespace-nowrap ${activeStep === index
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

                                        {/* Title BELOW for even indices */}
                                        {index % 2 === 0 && (
                                            <span
                                                className={`text-xl md:text-base font-medium absolute top-10 md:top-8 text-center whitespace-nowrap ${activeStep === index
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
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
