import { useState, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from '../../layout/Modal'

export default function TestMenuFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = {}
}) {
    const [form, setForm] = useState({
        name: "",
        sampleType: "",
        sampleVolume: "",
        testMethod: "",
        turnaroundTime: "",
        specialInstructions: "",
        price: ""
    });

    useEffect(() => {
        setForm({
            name: initialData.name || "",
            sampleType: initialData.sampleType || "",
            sampleVolume: initialData.sampleVolume || "",
            testMethod: initialData.testMethod || "",
            turnaroundTime: initialData.turnaroundTime || "",
            specialInstructions: initialData.specialInstructions || "",
            price: initialData.price || ""
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData._id ? "Update Test" : "Add Test"}
            size="lg"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                    <Input
                        name="name"
                        placeholder="Enter test name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Sample Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type</label>
                    <Input
                        name="sampleType"
                        placeholder="Enter sample type"
                        value={form.sampleType}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Sample Volume */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Volume</label>
                    <Input
                        name="sampleVolume"
                        placeholder="Enter sample volume"
                        value={form.sampleVolume}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Test Method */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Method</label>
                    <Input
                        name="testMethod"
                        placeholder="Enter test method"
                        value={form.testMethod}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Turnaround Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Turnaround Time</label>
                    <Input
                        name="turnaroundTime"
                        placeholder="Enter turnaround time"
                        value={form.turnaroundTime}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Special Instructions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                    <Input
                        name="specialInstructions"
                        placeholder="Any special instructions"
                        value={form.specialInstructions}
                        onChange={handleChange}
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <Input
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {initialData._id ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
