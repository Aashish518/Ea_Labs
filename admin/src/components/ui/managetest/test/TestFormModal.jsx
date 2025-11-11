import { useEffect, useState } from "react";
import Modal from "../../../layout/Modal";
import Input from "../../common/Input";
import Button from "../../common/Button";
import Textarea from "../../common/Textarea"

// Test Form Modal
const TestFormModal = ({ isOpen, onClose, onSubmit, editData, categories, locations }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        include: "",
        for: "",
        reportInTime: "",
        overview: "",
        testComponent: "",
        prerequisites: "",
        price: "",
        category: "",
        faqs: [],
        locations: [] // new field for selected locations
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || "",
                description: editData.description || "",
                include: editData.include?.join(", ") || "",
                for: editData.for?.join(", ") || "",
                reportInTime: editData.reportInTime || "",
                overview: editData.overview || "",
                testComponent: editData.testComponent?.join(", ") || "",
                prerequisites: editData.prerequisites?.join(", ") || "",
                price: editData.price || "",
                category: editData.category?._id || "",
                faqs: editData.faqs || [],
                locations: editData?.locations?.map(loc => loc._id) || []
            });
        } else {
            setFormData({
                name: "",
                description: "",
                include: "",
                for: "",
                reportInTime: "",
                overview: "",
                testComponent: "",
                prerequisites: "",
                price: "",
                category: "",
                faqs: [],
                locations: []
            });
        }
    }, [editData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            include: formData.include.split(",").map((s) => s.trim()).filter(Boolean),
            for: formData.for.split(",").map((s) => s.trim()).filter(Boolean),
            testComponent: formData.testComponent.split(",").map((s) => s.trim()).filter(Boolean),
            prerequisites: formData.prerequisites.split(",").map((s) => s.trim()).filter(Boolean),
            price: parseFloat(formData.price),
            category: formData.category,
            faqs: formData.faqs.filter(faq => faq.question && faq.answer),
            locations: formData.locations // array of selected location ids
        };
        onSubmit(submitData);
    };

    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...formData.faqs];
        updatedFaqs[index][field] = value;
        setFormData({ ...formData, faqs: updatedFaqs });
    };

    const addFaq = () => {
        setFormData({
            ...formData,
            faqs: [...formData.faqs, { question: "", answer: "" }]
        });
    };

    const removeFaq = (index) => {
        const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
        setFormData({ ...formData, faqs: updatedFaqs });
    };

    const handleLocationChange = (locationId) => {
        const updated = formData.locations.includes(locationId)
            ? formData.locations.filter(id => id !== locationId)
            : [...formData.locations, locationId];
        setFormData({ ...formData, locations: updated });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editData ? "Edit Test" : "Add New Test"} size="xl">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="Test Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter test name"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Price  <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="Price"
                            type="Number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Enter price ( Number Only )"
                            required
                            className="md:col-span-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prerequisites <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="Prerequisites (comma separated)"
                            value={formData.prerequisites}
                            onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                            placeholder="e.g. Fasting required, No alcohol"
                        />
                    </div>
                </div>
                
                {/* location */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Locations <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {Array.isArray(locations) && locations.length > 0 ? (
                            locations.map((loc) => (
                                <label key={loc._id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={loc._id}
                                        checked={formData.locations.includes(loc._id)}
                                        onChange={() => handleLocationChange(loc._id)}
                                    />
                                    <span>{loc.locationName}</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-500">No locations available.</p>
                        )}

                    </div>
                </div>


                <div className="mt-4">
                    <Textarea
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter test description"
                        rows={3}
                        required={true}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Include <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="Include (comma separated)"
                            value={formData.include}
                            onChange={(e) => setFormData({ ...formData, include: e.target.value })}
                            placeholder="e.g. Blood Test, Urine Test"
                        />
                    </div>
                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            For <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="For (comma separated)"
                            value={formData.for}
                            onChange={(e) => setFormData({ ...formData, for: e.target.value })}
                            placeholder="e.g. Adults, Children"
                        />
                    </div>
                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Report <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="Report In Time"
                            value={formData.reportInTime}
                            type="Number"
                            onChange={(e) => setFormData({ ...formData, reportInTime: e.target.value })}
                            placeholder="( Only Number in hour )"
                        />
                    </div>
                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Components <span className="text-red-500">*</span>
                        </label>
                        <Input
                            label="Test Components (comma separated)"
                            value={formData.testComponent}
                            onChange={(e) => setFormData({ ...formData, testComponent: e.target.value })}
                            placeholder="e.g. Hemoglobin, WBC Count"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <Textarea
                        label="Overview"
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        placeholder="Enter test overview"
                        rows={3}
                        required={true}
                    />
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">FAQs</h3>
                    {formData.faqs.map((faq, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quetion <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    label="Question"
                                    value={faq.question}
                                    onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                    placeholder="Enter FAQ question"
                                    required
                                />
                            </div>
                            
                            <Textarea
                                label="Answer"
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                placeholder="Enter FAQ answer"
                                rows={2}
                                required
                            />
                            <Button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Remove FAQ
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={addFaq}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        + Add FAQ
                    </Button>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button type="button" onClick={onClose} className={"px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"}
>
                        Cancel
                    </Button>
                    <Button type="submit" className={"px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"}
>
                        {editData ? "Update" : "Create"} Test
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TestFormModal;
