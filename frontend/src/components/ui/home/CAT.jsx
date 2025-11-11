import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../common/Button";

const CTA = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/contactus");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#03ACEF] text-white"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mb-6 md:mb-0"
                    >
                        <h2 className="text-2xl font-bold">
                            Because peace of mind starts with clarity.
                        </h2>
                        <p>Book your test now for accurate, doctor-ready reports.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            onClick={handleClick}
                            className="bg-[#AA1626] text-white font-bold py-3 px-8 rounded-full hover:bg-gray-100 hover:text-[#AA1626] transition duration-300 whitespace-nowrap"
                        >
                            Book a test
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CTA;
