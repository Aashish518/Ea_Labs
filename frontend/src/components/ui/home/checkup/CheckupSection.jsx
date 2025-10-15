import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CheckupCard from "./CheckupCard";
import { getAllTestPackages } from "../../../../api/apis/packagecategory";

const CheckupSection = ({ title }) => {
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["testPackages"],
        queryFn: getAllTestPackages,
    });

    if (isLoading) return <p className="text-center text-indigo-700">Loading...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load data</p>;

    const checkups = data || [];

    const handleCardClick = (id) => {
        navigate(`/packagetestdetail/${id}`);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl lg:text-2xl font-bold text-indigo-900 mb-6 text-center">
                {title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {checkups.length > 0 ? (
                    checkups.map((checkup) => (
                        <CheckupCard
                            key={checkup._id}
                            imageUrl={`http://localhost:7000${checkup.image}`}
                            title={checkup.name}
                            Price={`₹${checkup.price}`}
                            onClick={() => handleCardClick(checkup._id)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-full">
                        No test packages found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CheckupSection;
