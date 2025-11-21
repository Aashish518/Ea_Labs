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
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

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

    // if (!steps.length)
    //     return (
    //         <div className="flex justify-center items-center py-20 text-gray-500">
    //             No About Us data found.
    //         </div>
    //     );

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto sm:px-11">
                <section className="bg-gray-50 pt-10 md:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">
                            About Us
                        </h1>

                        {/* About Section */}
                        <div className="grid md:grid-cols-2 items-center gap-10 md:gap-16 mb-12">
                            <div className="order-2 md:order-1">
                                <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                                    <strong>About EA Laboratories</strong>
                                    <br /><br />
                                    Founded in 1991, EA Laboratories has been at the forefront of diagnostic excellence for over three decades.
                                    Built on a foundation of quality, precision, and patient-first care, we continue to set new benchmarks in the field of medical testing.
                                    <br /><br />
                                    In 1992, we became India’s first laboratory to introduce inter-laboratory reference testing, connecting diagnostic centers across and beyond state borders.
                                    <br /><br />
                                    Our spirit of innovation didn’t stop there. In 1998, EA Laboratories pioneered In Vitro Allergy Testing in India. Since then, we’ve tested over 9,45,000 samples and offered de-sensitization therapy to more than 2,40,000 patients.
                                    <br /><br />
                                    Today, as a multi-specialty testing laboratory, EA Labs remains driven by one purpose — to deliver accurate diagnostics, advanced technology, and assured care that patients and doctors can trust every single time.
                                </p>
                            </div>

                            {/* Image */}
                            <div className="flex justify-center order-1 md:order-2">
                                <img
                                    src={`${import.meta.env.VITE_BACK_URL}/uploads/1762516502581.jpg`}
                                    alt="Our Team"
                                    className="w-full h-[400px] max-w-md rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="rounded-3xl mb-6">
                            <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
                                Our Mission & Our Vision
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

                                {/* Mission */}
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 flex flex-col h-full">
                                    <h3 className="text-xl md:text-3xl font-bold text-blue-600 mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed grow">
                                        To make diagnostics more than just data — to make it a path to better living.
                                        At EA Laboratories, we’re driven to deliver precise, reliable, and accessible testing that empowers doctors,
                                        reassures patients, and strengthens the trust between care and cure.
                                    </p>
                                </div>

                                {/* Vision */}
                                <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 flex flex-col h-full">
                                    <h3 className="text-xl md:text-3xl font-bold text-teal-600 mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.504A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.504M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Our Vision
                                    </h3>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed grow">
                                        To be India’s most trusted name in diagnostics — recognised for accuracy, compassion, and the pursuit of continuous scientific advancement.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                {!steps || steps.length === 0 ? (
    <div className="flex justify-center items-center py-20 text-gray-500">
        No About Us data found.
    </div>
) : (
    <>
        {/* MAIN ABOUT UI */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:px-20 px-4">
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
                        key={steps[activeStep]?._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
                            {steps[activeStep]?.title}
                        </h2>

                        <p className="wrap-break-word whitespace-normal leading-relaxed text-base md:text-lg">
                            {steps[activeStep]?.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-12 md:mt-8 mb-15 px-4">
            <div className="overflow-x-auto md:overflow-visible md:px-15 scrollbar-hide">
                <div className="relative min-w-max md:min-w-0 py-12">
                    
                    {/* line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>

                    {/* Steps */}
                    <div className="flex gap-16 md:justify-between relative z-10 px-4">
                        {steps.map((step, index) => (
                            <div
                                key={step._id}
                                className="flex flex-col items-center cursor-pointer group relative shrink-0"
                                onClick={() => setActiveStep(index)}
                            >
                                {/* Title top for odd */}
                                {index % 2 !== 0 && (
                                    <span
                                        className={`text-xl md:text-base font-medium absolute -top-10 md:-top-8 text-center whitespace-nowrap ${
                                            activeStep === index
                                                ? "text-blue-600"
                                                : "text-gray-500 group-hover:text-blue-300"
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                )}

                                {/* Dot */}
                                <div
                                    className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                                        activeStep === index
                                            ? "bg-blue-200 border-blue-600 scale-110"
                                            : "bg-white border-gray-400 group-hover:border-blue-300"
                                    }`}
                                ></div>

                                {/* Title bottom for even */}
                                {index % 2 === 0 && (
                                    <span
                                        className={`text-xl md:text-base font-medium absolute top-10 md:top-8 text-center whitespace-nowrap ${
                                            activeStep === index
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
    </>
)}

            </div>
        </section>
    );
};

export default AboutUs;
