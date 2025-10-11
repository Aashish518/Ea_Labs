const ContactUs = () => {
    return (
        <div className="flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">

                {/* Right Image (Mobile First) */}
                <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="w-full h-64 md:h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Contact Illustration"
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>

                {/* Left Form */}
                <div className="order-2 md:order-1">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Our single goal: fast, accurate, affordable diagnostics for every patient.
                    </p>

                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Email ID"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Address Line 1"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Pincode"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Submit Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
