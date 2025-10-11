// Certifications Component
const Certifications = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5">
            <p className="text-[18px] text-gray-600 max-w-4xl mx-auto mb-12">
                At EA Labs, an ISO, NABL & ICMR certified diagnostics center, we combine cutting-edge analyzers, globally validated assays, and rigorous quality controls to deliver clean, actionable results.
            </p>
            <div className="flex justify-center items-center space-between space-x-1 sm:space-x-8 md:space-x-16 mb-13">
                <img src="https://placehold.co/150x150/EFEFEF/333333?text=ISO+9001:2015" alt="ISO Certified" className="h-24 md:h-32" />
                <img src="https://placehold.co/150x150/EFEFEF/333333?text=ICMR" alt="ICMR Certified" className="h-24 md:h-32" />
                <img src="https://placehold.co/150x150/EFEFEF/333333?text=NABL" alt="NABL Certified" className="h-24 md:h-32" />
            </div>
        </div>
    </section>
);

export default Certifications;