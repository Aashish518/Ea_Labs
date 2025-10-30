import Icon from "../../Icon";
import Button from "../common/Button";

const PackageGrid = ({ packages, onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-15">
            {packages.map((pkg, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                    <div className="p-5 flex-grow w-full">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{pkg.name}</h3>
                        <hr className="mb-2"/>
                        <div className="mb-4 text-gray-600 text-sm space-y-1">
                            <p>
                                <span className="font-semibold text-gray-700">Sample Type:</span>{" "}
                                {pkg.sampleType}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Sample Volume:</span>{" "}
                                {pkg.sampleVolume}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Test Method:</span>{" "}
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
                </div>
            ))}
        </div>
    );
};

export default PackageGrid;
