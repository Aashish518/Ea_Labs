import Image from "../common/Image";
import icmr from "../../../assets/img/ICMR.png";
import iso from "../../../assets/img/ISO.png";
import nabl from "../../../assets/img/NABL.png"

// Certifications Component
const Certifications = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5">
            <p className="text-[18px] text-gray-600 max-w-4xl mx-auto mb-12">
                At EA Labs, an ISO, NABL & ICMR certified diagnostics center, we combine cutting-edge analyzers, globally validated assays, and rigorous quality controls to deliver clean, actionable results.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-16 mb-10">
                <Image
                    src={iso}
                    alt="ISO Certified"
                    className="h-16 sm:h-20 md:h-28 w-auto"
                />
                <Image
                    src={icmr}
                    alt="ICMR Certified"
                    className="h-16 sm:h-20 md:h-28 w-auto"
                />
                <Image
                    src={nabl}
                    alt="NABL Certified"
                    className="h-16 sm:h-20 md:h-28 w-auto"
                />
            </div>

        </div>
    </section>
);

export default Certifications;