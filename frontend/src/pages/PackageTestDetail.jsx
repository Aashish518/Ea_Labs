import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, FileText, Users, TestTube, CheckCircle } from "lucide-react";
import Button from "../components/ui/common/Button";
import { getTestsByPackageId } from "../api/apis/packagecategory";
import Loading from "../components/Loading";

const PackageTestDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["tests", id],
        queryFn: () => getTestsByPackageId(id),
        enabled: !!id,
    });

    const packageInfo = data?.package;
    const tests = data?.tests || [];

    const handleBack = () => {
        navigate("/", { state: { scrollToCheckupSection: true } });
    };

    if (isLoading) {
        return (
            <Loading message="Loading Package Details..."/>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Package</h2>
                    <p className="text-gray-600 mb-6">We couldn't fetch the package details. Please try again.</p>
                    <Button onClick={handleBack} className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    if (!tests || tests.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TestTube className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tests Found</h2>
                    <p className="text-gray-600 mb-6">This package doesn't have any tests available.</p>
                    <Button onClick={handleBack} className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const renderArray = (arr) => {
        if (!arr || arr.length === 0) {
            return <span className="text-gray-400 text-sm">Not specified</span>;
        }

        // Check if first item is object or primitive
        const firstItem = arr[0];
        if (typeof firstItem === "object" && firstItem !== null) {
            // Array of objects → render as list
            return (
                <ul className="space-y-1.5 mt-2">
                    {arr.map((item, index) => (
                        <li key={index} className="text-sm bg-gray-50 p-2.5 rounded border border-gray-100">
                            {Object.entries(item)
                                .filter(([key]) => key !== "_id")
                                .map(([key, value], idx) => (
                                    <div key={key} className={idx > 0 ? "mt-1" : ""}>
                                        <span className="font-medium text-gray-700 capitalize">{key}:</span>{" "}
                                        <span className="text-gray-600">
                                            {Array.isArray(value) ? value.join(", ") : value}
                                        </span>
                                    </div>
                                ))}
                        </li>
                    ))}
                </ul>
            );
        } else {
            // Array of primitives → join with comma
            return <span className="text-gray-700">{arr.join(", ")}</span>;
        }
    };


    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back 
                </button>

                {/* Header Section */}
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{packageInfo?.name}</h1>
                        <p className="text-gray-600 text-sm">
                            {tests.length} {tests.length === 1 ? "test" : "tests"} included
                        </p>
                    </div>
                    <div>
                        <span className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-lg text-lg">
                            ₹{packageInfo?.price}
                        </span>
                    </div>
                </div>


                {/* Tests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test) => (
                        <div
                            key={test._id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                        >
                            {/* Card Header */}
                            <div className="border-b border-gray-200 p-5 bg-gray-50">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h2>
                                {test.reportInTime && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{test.reportInTime} hours</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-5 space-y-5 flex-1">
                                {/* Description */}
                                {test.description && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileText className="w-4 h-4 text-gray-600" />
                                            <h3 className="font-semibold text-gray-900 text-sm">Description</h3>
                                        </div>
                                        <div className="text-sm text-gray-600">{test.description}</div>
                                    </div>
                                )}

                                {/* Includes */}
                                {test.include && test.include.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-gray-600" />
                                            <h3 className="font-semibold text-gray-900 text-sm">Includes</h3>
                                        </div>
                                        {renderArray(test.include)}
                                    </div>
                                )}

                                {/* For */}
                                {test.for && test.for.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Users className="w-4 h-4 text-gray-600" />
                                            <h3 className="font-semibold text-gray-900 text-sm">Recommended For</h3>
                                        </div>
                                        {renderArray(test.for)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageTestDetail;