import { useState, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../../layout/Modal";

export default function TestMenuFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData = {},
}) {
    const [form, setForm] = useState({
        name: "",
        sampleType: "",
        sampleVolume: "",
        testMethod: "",
        turnaroundTime: "",
        specialInstructions: "",
        price: "",
    });

    // ✅ Initialize with empty arrays so map() always works
    const [suggestions, setSuggestions] = useState({
        sampleType: [],
        sampleVolume: [],
        testMethod: [],
        turnaroundTime: [],
    });

    // ✅ Load from localStorage safely
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("testSuggestions")) || {};
            setSuggestions({
                sampleType: stored.sampleType || [],
                sampleVolume: stored.sampleVolume || [],
                testMethod: stored.testMethod || [],
                turnaroundTime: stored.turnaroundTime || [],
            });
        } catch {
            setSuggestions({
                sampleType: [],
                sampleVolume: [],
                testMethod: [],
                turnaroundTime: [],
            });
        }
    }, []);

    // ✅ Pre-fill form for edit
    useEffect(() => {
        setForm({
            name: initialData.name || "",
            sampleType: initialData.sampleType || "",
            sampleVolume: initialData.sampleVolume || "",
            testMethod: initialData.testMethod || "",
            turnaroundTime: initialData.turnaroundTime || "",
            specialInstructions: initialData.specialInstructions || "",
            price: initialData.price || "",
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Add new suggestions if not duplicate
        const newSuggestions = { ...suggestions };
        ["sampleType", "sampleVolume", "testMethod", "turnaroundTime"].forEach(
            (key) => {
                if (
                    form[key] &&
                    !newSuggestions[key].includes(form[key])
                ) {
                    newSuggestions[key] = [form[key], ...newSuggestions[key]].slice(
                        0,
                        10
                    ); // keep latest 10 only
                }
            }
        );

        setSuggestions(newSuggestions);
        localStorage.setItem("testSuggestions", JSON.stringify(newSuggestions));

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
                {/* Test Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="name"
                        placeholder="Enter test name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Sample Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sample Type <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="sampleType"
                        list="sampleType-list"
                        value={form.sampleType}
                        onChange={handleChange}
                        placeholder="Enter sample type"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                    <datalist id="sampleType-list">
                        {(suggestions.sampleType || []).map((opt, i) => (
                            <option key={i} value={opt} />
                        ))}
                    </datalist>
                </div>

                {/* Sample Volume */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sample Volume <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="sampleVolume"
                        list="sampleVolume-list"
                        value={form.sampleVolume}
                        onChange={handleChange}
                        placeholder="Enter sample volume"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <datalist id="sampleVolume-list">
                        {(suggestions.sampleVolume || []).map((opt, i) => (
                            <option key={i} value={opt} />
                        ))}
                    </datalist>
                </div>

                {/* Test Method */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Method <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="testMethod"
                        list="testMethod-list"
                        value={form.testMethod}
                        onChange={handleChange}
                        placeholder="Enter test method"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <datalist id="testMethod-list">
                        {(suggestions.testMethod || []).map((opt, i) => (
                            <option key={i} value={opt} />
                        ))}
                    </datalist>
                </div>

                {/* Turnaround Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Turnaround Time <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="turnaroundTime"
                        list="turnaroundTime-list"
                        value={form.turnaroundTime}
                        onChange={handleChange}
                        placeholder="Enter turnaround time"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <datalist id="turnaroundTime-list">
                        {(suggestions.turnaroundTime || []).map((opt, i) => (
                            <option key={i} value={opt} />
                        ))}
                    </datalist>
                </div>

                {/* Special Instructions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Instructions <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="specialInstructions"
                        placeholder="Any special instructions"
                        value={form.specialInstructions}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <Input
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        value={form.price}
                        onChange={handleChange}
                        required
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
