import React from "react";

const Stats = () => (
    <section className="bg-[#203270] py-20 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="mb-10 text-left">
                <h2 className="text-4xl font-bold mb-2 text-white">EA Labs - Trusted by Families</h2>
                <p className="text-white max-w-2xl text-lg">
                    Our single goal: fast, accurate, affordable diagnostics for every patient.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 p-6 rounded-xl  flex flex-col items-start justify-center">
                    <p className="text-3xl font-bold">7,00,000+</p>
                    <p className="mt-2 text-sm font-medium">Customers Served</p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 p-6 rounded-xl  flex flex-col items-start justify-center">
                    <p className="text-3xl font-bold">16,000+</p>
                    <p className="mt-2 text-sm font-medium">Tests Processed Every Day</p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 p-6 rounded-xl  flex flex-col items-start justify-center">
                    <p className="text-3xl font-bold">15+</p>
                    <p className="mt-2 text-sm font-medium">Cities Covered</p>
                </div>
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 p-6 rounded-xl  flex flex-col items-start justify-center">
                    <p className="text-3xl font-bold">98.5%+</p>
                    <p className="mt-2 text-sm font-medium">On-time Report Delivery</p>
                </div>
            </div>

        </div>
    </section>
);

export default Stats;
