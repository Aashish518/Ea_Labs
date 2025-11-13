import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, FileText, Users, TestTube, CheckCircle, Package } from "lucide-react";
import Button from "../components/ui/common/Button";
import { getTestsByPackageId } from "../api/apis/packagecategory";
import Loading from "../components/Loading";
import Button from "../components/ui/common/Button"
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
        return <Loading message="Loading Package Details..." />;
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Package</h2>
                    <p className="text-gray-600 mb-6">We couldn't fetch the package details. Please try again.</p>
                    <Button onClick={handleBack} className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    if (!tests || tests.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TestTube className="w-8 h-8 text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tests Found</h2>
                    <p className="text-gray-600 mb-6">This package doesn't have any tests available.</p>
                    <Button onClick={handleBack} className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const renderArray = (arr) => {
        if (!arr || arr.length === 0) {
            return <span className="text-gray-400 text-sm italic">Not specified</span>;
        }

        const firstItem = arr[0];
        if (typeof firstItem === "object" && firstItem !== null) {
            return (
                <ul className="space-y-2 mt-2">
                    {arr.map((item, index) => (
                        <li key={index} className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                            {Object.entries(item)
                                .filter(([key]) => key !== "_id")
                                .map(([key, value], idx) => (
                                    <div key={key} className={idx > 0 ? "mt-1.5" : ""}>
                                        <span className="font-semibold text-gray-800 capitalize">{key}:</span>{" "}
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
            return <span className="text-gray-700 text-sm">{arr.join(", ")}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900 font-medium transition-all hover:gap-3 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Button>

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                <Package className="w-7 h-7 text-gray-700" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {packageInfo?.name}
                                </h1>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <TestTube className="w-4 h-4" />
                                    {tests.length} {tests.length === 1 ? "test" : "tests"} included
                                </p>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1 font-medium">Package Price</p>
                            <span className="inline-block bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-2xl">
                                ₹{packageInfo?.price}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Included Tests</h2>
                    <p className="text-gray-600">Complete details of each diagnostic test</p>
                </div>

                {/* Tests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test) => (
                        <div
                            key={test._id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-200 hover:-translate-y-0.5"
                        >
                            {/* Card Header */}
                            <div className="bg-gray-900 p-6 text-white">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                        <TestTube className="w-5 h-5" />
                                    </div>
                                    {test.reportInTime && (
                                        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-xs font-medium">{test.reportInTime}h</span>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold leading-tight">{test.name}</h2>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 space-y-5 flex-1">
                                {/* Description */}
                                {test.description && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 text-sm">Description</h3>
                                        </div>
                                        <div className="text-sm text-gray-600 leading-relaxed pl-10">{test.description}</div>
                                    </div>
                                )}

                                {/* Includes */}
                                {test.include && test.include.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 text-sm">Includes</h3>
                                        </div>
                                        <div className="pl-10">{renderArray(test.include)}</div>
                                    </div>
                                )}

                                {/* For */}
                                {test.for && test.for.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-4 h-4 text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 text-sm">Recommended For</h3>
                                        </div>
                                        <div className="pl-10">{renderArray(test.for)}</div>
                                    </div>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="h-1 bg-gray-900"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageTestDetail;