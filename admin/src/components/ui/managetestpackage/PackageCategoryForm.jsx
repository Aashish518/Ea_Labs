// import { useEffect, useState } from "react";
// import Modal from "../../layout/Modal";
// import Input from "../common/Input";
// import ImageUpload from "../common/ImageUpload";
// import Button from "../common/Button";


// const TestPackageFormModal = ({ isOpen, onClose, onSubmit, editData }) => {
//     const [name, setName] = useState(editData?.name || "");
//     const [ageRange, setAgeRange] = useState(editData?.age_range || "");
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(
//         editData?.image ? `http://localhost:7000${editData.image}` : null
//     );

//     useEffect(() => {
//         setName(editData?.name || "");
//         setAgeRange(editData?.age_range || "");
//         setPreview(editData?.image ? `http://localhost:7000${editData.image}` : null);
//     }, [editData]);

//     const handleUpload = (files) => {
//         const file = files[0];
//         setImage(file);
//         setPreview(URL.createObjectURL(file));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("age_range", ageRange);
//         if (image) formData.append("image", image);

//         onSubmit(formData);

//         setName("");
//         setAgeRange("");
//         setImage(null);
//         setPreview(null);
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onClose={onClose}
//             title={editData ? "Edit Test Package" : "Add New Test Package"}
//             size="sm"
//         >
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Package Name <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter package name"
//                         required
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Age Range <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                         value={ageRange}
//                         onChange={(e) => setAgeRange(e.target.value)}
//                         placeholder="Enter age range (e.g., 18-60 years)"
//                         required
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Package Image
//                     </label>
//                     <ImageUpload onUpload={handleUpload} />
//                     {preview && (
//                         <img src={preview} alt="Preview" className="mt-3 w-24 h-24 rounded border" />
//                     )}
//                 </div>

//                 <div className="flex gap-3 mt-6">
//                     <Button
//                         type="button"
//                         onClick={onClose}
//                         className="px-4 py-2 rounded-lg font-medium bg-gray-300 hover:bg-gray-400"
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
//                     >
//                         {editData ? "Update" : "Create"} Package
//                     </Button>
//                 </div>
//             </form>
//         </Modal>
//     );
// };

// export default TestPackageFormModal;


import { useEffect, useState } from "react";
import Modal from "../../layout/Modal";
import Input from "../common/Input";
import ImageUpload from "../common/ImageUpload";
import Button from "../common/Button";
import Table from "../../Table";

const TestPackageFormModal = ({ isOpen, onClose, onSubmit, editData, testsData = [] }) => {
    const [name, setName] = useState(editData?.name || "");
    const [price, setPrice] = useState(editData?.price || "");
    const [selectedTests, setSelectedTests] = useState(editData?.tests || []);
    const [enable, setEnable] = useState(editData ? editData.enable : true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(editData?.image ? `http://localhost:7000${editData.image}` : null);
    const [searchTerm, setSearchTerm] = useState("");

    // Update fields when editing
    useEffect(() => {
        setName(editData?.name || "");
        setPrice(editData?.price || "");
        setSelectedTests(editData?.tests || []);
        setEnable(editData ? editData.enable : true); // auto-checked for new packages
        setPreview(editData?.image ? `http://localhost:7000${editData.image}` : null);
    }, [editData]);

    // Filter tests when user types
    const filteredTests = testsData.filter((test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpload = (files) => {
        const file = files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // Toggle full test object selection
    const toggleTestSelection = (test) => {
        setSelectedTests((prev) => {
            const exists = prev.find((t) => t._id === test._id);
            if (exists) {
                return prev.filter((t) => t._id !== test._id);
            } else {
                return [...prev, test];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("enable", enable);

        // Send full test objects as JSON strings
        selectedTests.forEach((test) => {
            formData.append("tests", JSON.stringify(test));
        });

        if (image) formData.append("image", image);

        onSubmit(formData);

        // Reset form
        setName("");
        setPrice("");
        setSelectedTests([]);
        setEnable(true); // new package auto-checked
        setImage(null);
        setPreview(null);
        setSearchTerm("");
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? "Edit Test Package" : "Add New Test Package"}
            size="md"
        >
            <form onSubmit={handleSubmit}>
                {/* Package Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter package name"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                    />
                </div>

                {/* Search & Select Tests */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Tests <span className="text-red-500">*</span>
                    </label>

                    {/* Search */}
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search tests..."
                    />

                    {/* Selected Tests */}
                    {selectedTests.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {selectedTests.map((test) => (
                                <span
                                    key={test._id}
                                    className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                                >
                                    {test.name}
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => toggleTestSelection(test)}
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Only show test list if user types */}
                    {searchTerm.trim() && (
                        <div className="mt-3 max-h-60 overflow-y-auto border rounded-md p-2">
                            {filteredTests.length > 0 ? (
                                <Table
                                    headers={["Test Name", "Action"]}
                                    data={filteredTests.map((test) => ({
                                        _id: test._id,
                                        name: test.name,
                                        action: (
                                            <Button
                                                type="button"
                                                className={`px-2 py-1 text-sm rounded ${selectedTests.find((t) => t._id === test._id)
                                                    ? "bg-red-500 text-white"
                                                    : "bg-green-500 text-white"
                                                    }`}
                                                onClick={() => toggleTestSelection(test)}
                                            >
                                                {selectedTests.find((t) => t._id === test._id) ? "Remove" : "Add"}
                                            </Button>
                                        ),
                                    }))}
                                    emptyMessage="No tests found"
                                />
                            ) : (
                                <p className="text-gray-500 text-center py-3">No tests found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Enable Toggle */}
                <div className="mt-4 flex items-center gap-2">
                    <input
                        id="enable"
                        type="checkbox"
                        checked={enable}
                        onChange={(e) => setEnable(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="enable" className="text-sm text-gray-700">
                        Enable this package
                    </label>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Image
                    </label>
                    <ImageUpload onUpload={handleUpload} />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-24 h-24 rounded border"
                        />
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg font-medium bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {editData ? "Update" : "Create"} Package
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TestPackageFormModal;


