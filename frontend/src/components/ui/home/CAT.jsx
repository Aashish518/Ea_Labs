import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const CTA = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/contactus");
    };

    return (
        <div className="bg-[#03ACEF] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold">
                            Because peace of mind starts with clarity.
                        </h2>
                        <p>Book your test now for accurate, doctor-ready reports.</p>
                    </div>
                    <Button
                        onClick={handleClick}
                        className="bg-[#AA1626] text-white font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 whitespace-nowrap"
                    >
                        Book a test
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CTA;
