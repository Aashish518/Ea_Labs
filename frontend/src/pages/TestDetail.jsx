import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/ui/common/Button";
import api from "../api/config/config";
import Loading from "../components/Loading";

const TestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    // Fetch test by id
    const { data: test, isLoading, isError } = useQuery({
        queryKey: ["test", id],
        queryFn: async () => {
            const { data } = await api.get(`/tests/${id}`);
            return data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return <Loading message="Loading Test Details"/>;
    }

    if (isError || !test) {
        return <div className="p-8 text-center text-red-500">Error loading test details</div>;
    }

    const handleContactClick = () => {
        navigate("/contactus");
    };

    return (
        <div className="bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-6">
                    <Button
                        onClick={() => navigate("/", { state: { scrollToHealthPackages: true } })}
                        className="flex items-center text-black hover:text-gray-900 font-medium"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left - Main details */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                        <h1 className="text-3xl font-bold text-black mb-2">{test.name}</h1>
                        <p className="text-gray-600 mb-6">{test.description}</p>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex overflow-x-auto space-x-8" aria-label="Tabs">
                                <Button
                                    onClick={() => setActiveTab("overview")}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "overview"
                                            ? "border-[#AA1626] text-[#AA1626]"
                                            : "border-transparent text-black hover:text-black hover:border-gray-300"
                                        }`}
                                >
                                    Overview
                                </Button>
                                <Button
                                    onClick={() => setActiveTab("components")}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "components"
                                            ? "border-[#AA1626] text-[#AA1626]"
                                            : "border-transparent text-black hover:text-black hover:border-gray-300"
                                        }`}
                                >
                                    Test Components
                                </Button>
                                <Button
                                    onClick={() => setActiveTab("prerequisites")}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "prerequisites"
                                            ? "border-[#AA1626] text-[#AA1626]"
                                            : "border-transparent text-black hover:text-black hover:border-gray-300"
                                        }`}
                                >
                                    Prerequisites
                                </Button>
                                <Button
                                    onClick={() => setActiveTab("faqs")}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "faqs"
                                            ? "border-[#AA1626] text-[#AA1626]"
                                            : "border-transparent text-black hover:text-black hover:border-gray-300"
                                        }`}
                                >
                                    FAQs
                                </Button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div>
                            {activeTab === "overview" && <p className="text-black leading-relaxed">{test.overview}</p>}
                            {activeTab === "components" && (
                                <ul className="list-disc list-inside text-black space-y-2">
                                    {test.testComponent.map((c) => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                            )}
                            {activeTab === "prerequisites" && (
                                <ul className="list-disc list-inside text-black space-y-2">
                                    {test.prerequisites.map((p, index) => (
                                        <li key={index}>{p}</li>
                                    ))}
                                </ul>
                            )}
                            {activeTab === "faqs" && (
                                <div className="space-y-4">
                                    {test.faqs.map((faq, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold text-black">{faq.question}</h4>
                                            <p className="text-black mt-1">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right - Price and Contact */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-12">
                            <div className="flex justify-between items-baseline mb-4">
                                <h2 className="text-xl font-bold text-black">Price</h2>
                                <span className="text-3xl font-bold text-red-600">{test.price}/-</span>
                            </div>
                            <p className="text-sm text-black mb-6">Includes all taxes and fees.</p>
                            <Button
                                onClick={handleContactClick}
                                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetail;
