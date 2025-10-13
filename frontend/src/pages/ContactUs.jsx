import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Button from "../components/ui/common/Button";
import Input from "../components/ui/common/Input";
import Image from "../components/ui/common/Image";
import { createContact } from "../api/apis/contactus";
import AlertBox from "../components/ui/common/AlertBox";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    // 🔹 TanStack mutation setup
    const mutation = useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
            });
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await mutation.mutateAsync(formData); 
            AlertBox({
                type: "success",
                message: response?.message,
            });
        } catch (error) {
            AlertBox({
                type: "error",
                message: error?.message || "Something went wrong",
            });
        }
    };


    return (
        <div className="flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">

                {/* Right Image */}
                <div className="flex items-center justify-center order-1 md:order-2">
                    <div className="w-full h-64 md:h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
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

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Your Name"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Company Name"
                                name="company"
                                placeholder="Company Name"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Email ID"
                                type="email"
                                name="email"
                                placeholder="Email ID"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            label="Address"
                            name="address"
                            placeholder="Address Line 1"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="City"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            <Input
                                label="Pincode"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Submitting..." : "Submit Now"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
