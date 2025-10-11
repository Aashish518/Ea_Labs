import Button from "../common/Button";

const CTA = () => (
    <section className="bg-[#03ACEF] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">Take control of your health today.</h2>
                    <p>Book a test in minutes and get reports you can rely on.</p>
                </div>
                <Button
                    className="bg-[#AA1626] text-white font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 whitespace-nowrap">
                    Book a test
                </Button>
            </div>
        </div>
    </section>
);

export default CTA;